import { GraphQLClient, gql } from "graphql-request";
import Stripe from "stripe";
import { graphcms } from "@/lib/graphcms/client";
import { IProduct } from "@/types";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2022-11-15" });

import { NextResponse } from "next/server";
import { cart } from "swell-js";
import { LineItem } from "@stripe/stripe-js";

export async function POST(request: Request) {
    const { cartProducts } = await request.json();

    const slugs: string[] = cartProducts.map((pro: IProduct) => {
        return pro.slug;
    });

    console.log("data: ", cartProducts);
    const products: any = await graphcms.request(
        gql`
            query ProductVariationQuery($slug: [String]!) {
                productVariations(where: { slug_in: $slug }) {
                    name
                    price
                    slug
                    images {
                        id
                        url
                    }
                }
            }
        `,
        {
            slug: slugs,
        }
    );
    try {
        const itemsCreation = () => {
            const items = Promise.all(
                products.productVariations.map(async (product: any) => {
                    const item = await stripe.products.create({
                        id: product.slug,
                        name: product.name,
                        tax_code: "txcd_99999999",
                        default_price_data: {
                            currency: "usd",
                            tax_behavior: "inclusive",
                            unit_amount: product.price,
                        },
                        images: [product.images![0].url],
                        shippable: true,
                    });
                    return item;
                })
            );
            return items;
        };
        const line_items_temp = () => {
            const pros = Promise.all(
                cartProducts.map(async (pro: any) => {
                    try {
                        const stripeProduct: Stripe.Response<Stripe.Product> =
                            await stripe.products.retrieve(pro.slug);
                        const line_item = {
                            price: stripeProduct.default_price,
                            quantity: pro.quantity,
                        };
                        return line_item;
                    } catch (e) {
                        console.log(e);
                    }
                })
            );
            return pros;
        };
        try {
            const itemCreations = await itemsCreation();
        } catch {}
        const line_items = await line_items_temp();
        const session = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/?id={CHECKOUT_SESSION_ID}",
            cancel_url: `http://localhost:3000/shop`,
            mode: "payment",
            payment_method_types: ["card", "cashapp"],
            line_items,
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: "Ground",
                        type: "fixed_amount",
                        fixed_amount: { amount: 700, currency: "USD" },
                    },
                },
            ],
            shipping_address_collection: {
                allowed_countries: ["US"],
            },
        });

        return NextResponse.json(session);
    } catch (e) {
        return NextResponse.json({ error: { message: e } });
    }
}
