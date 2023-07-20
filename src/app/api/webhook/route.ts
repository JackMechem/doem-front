import { NextResponse } from "next/server";
import Stripe from "stripe";
import EasyPostClient, { IRate, Shipment } from "@easypost/api/";
import { GraphQLClient } from "graphql-request";
import { Resend } from "resend";
import PaymentCompletedEmail from "../../../../emails/paymentCompleted";

const graphcms = new GraphQLClient(`${process.env.GRAPH_CMS_ENDPOINT}`, {
    headers: {
        Authorization: `${process.env.STRIPE_MUTATION_AUTH}`,
    },
});
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2022-11-15" });
const client: EasyPostClient = new EasyPostClient(`${process.env.EASY_POST_KEY}`);
const resend: Resend = new Resend(`${process.env.RESEND_KEY}`);

export async function POST(request: Request) {
    const event = await request.json();

    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["line_items.data.price.product", "customer_details"],
    });

    const line_items: Stripe.LineItem[] = session.line_items!.data;
    const customer_details = session.customer_details;
    const address = customer_details?.address;

    const shipment: Shipment = await client.Shipment.create({
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
        insurance: 0,
    });

    const rates = await client.Shipment.regenerateRates(shipment.id);

    const lowestRate = rates.rates.reduce((prev, curr) => {
        return Number(prev.rate) < Number(curr.rate) ? prev : curr;
    });

    console.log("lowest rate: ", lowestRate);

    await graphcms.request(
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
                trackingNumber: shipment.id,
                shipped: false,
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

    resend.sendEmail({
        from: "onboarding@resend.dev",
        to: customer_details!.email!.toString(),
        subject: "Order Completed",
        react: PaymentCompletedEmail({
            trackingUrl: "null",
            trackingCode: "null",
            total: session.amount_total!,
        }),
    });

    return NextResponse.json({ message: "Success", shipment: shipment });
}
