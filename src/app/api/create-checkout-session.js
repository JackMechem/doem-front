import Stripe from "stripe";
import { GraphQLClient } from "graphql-request";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const graphcms = new GraphQLClient(`${process.env.GRAPH_CMS_ENDPOINT}`);

import { NextResponse } from "next/server";

export default async function POST(request) {
    const { slug } = request.json;
    console.log("data: ", slug);
    const { product } = await graphcms.request(
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
    try {
        await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/?id={CHECKOUT_SESSION_ID}",
            cancel_url: `http://localhost:3000/product/${slug}`,
            mode: "payment",
            payment_method_types: ["card", "paypal"],
            line_items: [
                {
                    price_data: {
                        unit_amount: product.price,
                        currency: "USD",
                        product_data: {
                            name: product.name,
                        },
                    },
                    quantity: 1,
                },
            ],
        });
    } catch (e) {
        return NextResponse.json({ error: { message: e } });
    }
}
