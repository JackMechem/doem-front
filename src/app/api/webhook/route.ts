import { NextResponse } from "next/server";
import Stripe from "stripe";
import EasyPostClient from "@easypost/api/";
import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(`${process.env.GRAPH_CMS_ENDPOINT}`, {
    headers: {
        Authorization: `Bearer ${process.env.STRIPE_MUTATION_AUTH}`,
    },
});
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2022-11-15" });
const client = new EasyPostClient(`${process.env.EASY_POST_KEY}`);

export async function POST(request: Request) {
    const event = await request.json();

    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["line_items.data.price.product", "customer_details"],
    });

    const line_items: Stripe.LineItem[] = session.line_items!.data;
    const customer_details = session.customer_details;
    const address = customer_details?.address;

    const shipment = await client.Shipment.create({
        to_address: {
            name: customer_details?.name,
            street1: customer_details?.address?.line1,
            street2: customer_details?.address?.line2,
            city: customer_details?.address?.city,
            state: customer_details?.address?.state,
            zip: customer_details?.address?.postal_code,
            country: customer_details?.address?.country,
            email: customer_details?.email,
            phone: customer_details?.phone,
        },
        from_address: {
            street1: "417 montgomery street",
            street2: "FL 5",
            city: "San Francisco",
            state: "CA",
            zip: "94104",
            country: "US",
            company: "EasyPost",
            phone: "415-123-4567",
        },
        parcel: {
            length: 8,
            width: 8,
            height: 8,
            weight: 5,
        },
    });

    const boughtShipment = await client.Shipment.buy(shipment.id, shipment.rates[0]);

    console.log("bought shipment", boughtShipment);

    const trackingNumber = boughtShipment.tracking_code;

    const { order }: { order: any } = await graphcms.request(
        `
            mutation CreateOrderMutation($data: OrderCreateInput!) {
                createOrder(data: $data) {
                    stripeCheckoutId
                    orderItems {
                        name
                        slug
                        quantity
                    }
                }
            }
        `,
        {
            data: {
                email: customer_details?.email,
                total: session.amount_total,
                stripeCheckoutId: session.id,
                trackingNumber,
                address: {
                    create: {
                        country: address?.country,
                        state: address?.state,
                        city: address?.city,
                        line1: address?.line1,
                        line2: address?.line2,
                        postalCode: address?.postal_code,
                    },
                },
                orderItems: {
                    create: line_items!.map((li: any) => ({
                        name: li.price?.product.name,
                        slug: li.price?.product.id,
                        total: li.amount_total,
                        quantity: li.quantity,
                        productVariation: {
                            connect: {
                                slug: li.price?.product.id,
                            },
                        },
                    })),
                },
            },
        }
    );

    NextResponse.json({ order });
}
