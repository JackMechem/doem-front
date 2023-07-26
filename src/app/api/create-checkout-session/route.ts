import { GraphQLClient, gql } from "graphql-request";
import Stripe from "stripe";
import { graphcms } from "@/lib/graphcms/client";
import { CartProduct, IProduct, ProductVariation } from "@/types";
import { NextResponse } from "next/server";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2022-11-15" });

export async function POST(request: Request) {
    const { cartProducts } = await request.json();

    const slugs: string[] = cartProducts.map((pro: IProduct) => {
        return pro.slug;
    });

    console.log("data: ", cartProducts);
    const { productVariations }: { productVariations: ProductVariation[] } = await graphcms.request(
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
                productVariations.map(async (product: ProductVariation) => {
                    const item = await stripe.products.create({
                        id: product.slug,
                        name: product.name!,
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
                cartProducts.map(async (pro: CartProduct) => {
                    try {
                        const stripeProduct: Stripe.Response<Stripe.Product> =
                            await stripe.products.retrieve(pro.slug);
                        const line_item = {
                            price: stripeProduct.default_price,
                            quantity: pro.quantity,
                        };
                        return line_item;
                    } catch (e: any) {
                        console.log(e);
                    }
                })
            );
            return pros;
        };
        try {
            await itemsCreation();
        } catch {}
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = await line_items_temp();
        const success_url: string = `https://${process.env.SITE_URL}/shop?id={CHECKOUT_SESSION_ID}`;
        const cancel_url: string = `https://${process.env.SITE_URL}/shop`;
        const session: Stripe.Response<Stripe.Checkout.Session> =
            await stripe.checkout.sessions.create({
                success_url,
                cancel_url,
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

        return NextResponse.json({ message: "Success", session: session });
    } catch (e) {
        return NextResponse.json({ error: { message: e } });
    }
}
