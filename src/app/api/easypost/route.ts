import { NextResponse } from "next/server";
import { Resend } from "resend";
import PaymentCompletedEmail from "../../../../emails/paymentCompleted";

const resend: Resend = new Resend(`${process.env.RESEND_KEY}`);

export async function POST(request: Request) {
    const event = await request.json();

    console.log(event);

    return NextResponse.json({ data: JSON.stringify(event) });

    if (event.description === "tracker.created") {
        console.log(event.data.object);
        return NextResponse.json({ message: "success 1", body: { message: "message" } });
    } else {
        console.log(event);
        return NextResponse.json({ message: "Invalid Event", event: event });
    }
}
