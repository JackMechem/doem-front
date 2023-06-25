import { GraphQLClient, gql } from "graphql-request";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2022-11-15" });
const graphcms = new GraphQLClient(`${process.env.GRAPH_CMS_ENDPOINT}`);

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { slug } = await request.json();
    console.log("data: ", slug);
    const product: any = await graphcms.request(
        gql`
            query ProductVariationQuery($slug: String!) {
                productVariation(where: { slug: $slug }) {
                    name
                    price
                    slug
                }
            }
        `,
        {
            slug: slug,
        }
    );
    console.log("product: ", product);
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/?id={CHECKOUT_SESSION_ID}",
            cancel_url: `http://localhost:3000/product/${slug}`,
            mode: "payment",
            payment_method_types: ["card", "cashapp"],
            line_items: [
                {
                    price_data: {
                        unit_amount: product.productVariation.price,
                        currency: "USD",
                        product_data: {
                            name: product.productVariation.name,
                        },
                    },
                    quantity: 1,
                },
            ],
            shipping_address_collection: {
                allowed_countries: ["US"],
            },
        });

        console.log("session: ", session);
        return NextResponse.json(session);
    } catch (e) {
        return NextResponse.json({ error: { message: e } });
    }
}
