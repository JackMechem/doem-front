// const EasyPostClient = require("@easypost/api")

import EasyPostClient from "@easypost/api/";
import Stripe from "stripe";

const client = new EasyPostClient(`${process.env.EASY_POST_KEY}`);
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2022-11-15" });

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { sessionId } = await request.json();

    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    const shipment = await client.Shipment.create({
        to_address: {
            name: stripeSession.customer_details?.name,
            street1: stripeSession.customer_details?.address?.line1,
            street2: stripeSession.customer_details?.address?.line2,
            city: stripeSession.customer_details?.address?.city,
            state: stripeSession.customer_details?.address?.state,
            zip: stripeSession.customer_details?.address?.postal_code,
            country: stripeSession.customer_details?.address?.country,
            email: stripeSession.customer_details?.email,
            phone: stripeSession.customer_details?.phone,
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

    return NextResponse.json({ message: stripeSession });

    console.log("stripe session:: ", stripeSession);
}
