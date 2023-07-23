import { NextResponse } from "next/server";
import Stripe from "stripe";
import EasyPostClient, { IOrder, IRate, Shipment } from "@easypost/api/";
import { GraphQLClient } from "graphql-request";
import { Resend } from "resend";
import PaymentCompletedEmail from "../../../../emails/paymentCompleted";
import Shippo, { Parcel } from "shippo";
import { LineItem } from "@stripe/stripe-js";
import { currency } from "swell-js";

const graphcms = new GraphQLClient(`${process.env.GRAPH_CMS_ENDPOINT}`, {
    headers: {
        Authorization: `${process.env.STRIPE_MUTATION_AUTH}`,
    },
});

interface IOrderLineItem {
    currency: string;
    total: string;
    total_price: number;
    quantity: number;
    weight: number;
    weight_unit: "lb";
}

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2022-11-15" });
// const client: EasyPostClient = new EasyPostClient(`${process.env.EASY_POST_KEY}`);
const resend: Resend = new Resend(`${process.env.RESEND_KEY}`);

let shippo = require("shippo")(`${process.env.SHIPPO_TOKEN}`);

export async function POST(request: Request) {
    const event = await request.json();

    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["line_items.data.price.product", "customer_details"],
    });

    const line_items: Stripe.LineItem[] = session.line_items!.data;
    const customer_details = session.customer_details;
    const address = customer_details?.address;

    const orderMutation: any = await graphcms.request(
        `
            mutation CreateOrderMutation($data: OrderCreateInput!) {
                createOrder(data: $data) {
                    stripeCheckoutId
                    orderItems {
                        name
                        slug
                        quantity
                        productVariation {
                            name
                            price
                            variation
                            weight
                        }
                    }
                }
            }
        `,
        {
            data: {
                email: customer_details?.email,
                total: session.amount_total,
                stripeCheckoutId: session.id,
                trackingNumber: "1101",
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

    const addressFrom: Shippo.Address = await shippo.address.create({
        name: "Jack Mechem",
        company: "doem",
        street1: "10651 Robin Hill Ave",
        city: "Las Vegas",
        state: "Nevada",
        zip: "89129",
        country: "US",
        phone: "+1 702 201 4608",
        email: "mechemjack@gmail.com",
    });

    const addressTo: Shippo.Address = await shippo.address.create({
        name: customer_details?.name,
        street1: customer_details?.address?.line1,
        street2: customer_details?.address?.line2,
        city: customer_details?.address?.city,
        state: customer_details?.address?.state,
        zip: customer_details?.address?.postal_code,
        country: customer_details?.address?.country,
        email: customer_details?.email,
    });

    const date = new Date();

    const orderLineItems = orderMutation.createOrder.orderItems.map((item: any) => {
        return {
            currency: "USD",
            title: item.productVariation.name,
            total_price: item.productVariation.price / 100,
            quantity: item.quantity,
            weight: item.productVariation.weight,
            weight_unit: "lb",
        };
    });

    let packageWeight: number = orderLineItems.reduce(
        (partialSum: any, a: IOrderLineItem) => partialSum + a.weight * a.quantity,
        0
    );

    const order = await shippo.order.create({
        order_number: session.id,
        to_address: addressTo,
        from_address: addressFrom,
        placed_at: date,
        line_items: orderLineItems,
        weight: packageWeight,
        weight_unit: "lb",
    });

    const email = await resend.sendEmail({
        from: "doem@doemshop.com",
        to: [
            customer_details!.email!.toString(),
            "zanem37@gmail.com",
            "phuongdoo97@gmail.com",
            "officialdoem@gmail.com",
        ],
        subject: "Order Placed!",
        react: PaymentCompletedEmail({
            total: session.amount_total!,
            order: orderMutation.createOrder.orderItems,
            sessionId: session.id,
        }),
    });

    console.log(email);

    return NextResponse.json({ message: "Success", shipment: order });
}
