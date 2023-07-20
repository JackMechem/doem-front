import { NextResponse } from "next/server";
import { Resend } from "resend";
import PaymentCompletedEmail from "../../../../emails/paymentCompleted";

const resend: Resend = new Resend(`${process.env.RESEND_KEY}`);

export async function POST(request: Request) {
    const event = await request.json();

    if (event.data.description === "tracker.updated") {
        console.log(event.data);
        NextResponse.json({ message: "success", event: event });
    } else {
        return NextResponse.json({ message: "Invalid Event", event: event });
    }
}
