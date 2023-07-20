import { NextResponse } from "next/server";
import { Resend } from "resend";
import PaymentCompletedEmail from "../../../../emails/paymentCompleted";

const resend: Resend = new Resend(`${process.env.RESEND_KEY}`);

export async function POST(request: Request) {
    const event = await request.json();

    if (event.data.description === "tracker.created") {
        console.log(event.data);
        return NextResponse.json({ body: { message: "success 1" } });
    } else if (event.description === "tracker.created") {
        return NextResponse.json({ body: { message: "success 2" } });
    } else {
        return NextResponse.json({ message: "Invalid Event", event: event });
    }
}
