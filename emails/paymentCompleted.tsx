import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
} from "@react-email/components";
import * as React from "react";

interface NotionMagicLinkEmailProps {
    trackingCode: string;
    trackingUrl: string;
    total: number;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const PaymentCompletedEmail = ({
    trackingUrl,
    trackingCode,
    total,
}: NotionMagicLinkEmailProps) => (
    <Html>
        <Head />
        <Preview>Order Completed</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>doem</Heading>
                <Link
                    href={trackingUrl}
                    target="_blank"
                    style={{
                        ...link,
                        display: "block",
                        marginBottom: "16px",
                    }}
                >
                    Click here to track your package
                </Link>
                <Text style={{ ...text, marginBottom: "14px" }}>
                    Your Total:{" "}
                    {(total / 100).toLocaleString("en-us", { style: "currency", currency: "USD" })}
                </Text>
                <Text style={{ ...text, marginBottom: "14px" }}>Or, use your tracking number:</Text>
                <code style={code}>{trackingCode}</code>
                <Text
                    style={{
                        ...text,
                        color: "#ababab",
                        marginTop: "14px",
                        marginBottom: "16px",
                    }}
                >
                    Thank you for your purchase!
                </Text>
                <Text style={footer}>
                    <Link
                        href="https://notion.so"
                        target="_blank"
                        style={{ ...link, color: "#898989" }}
                    >
                        doem.com
                    </Link>
                    <br />
                    A SYNTHETIC NATURE
                    <br />
                    IN PURSUIT OF SLOW LIVING
                    <br />
                    CHINATOWN, LOS ANGELES
                </Text>
            </Container>
        </Body>
    </Html>
);

export default PaymentCompletedEmail;

const main = {
    backgroundColor: "#ffffff",
};

const container = {
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "0 auto",
};

const h1 = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
};

const link = {
    color: "#2754C5",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
};

const text = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
};

const footer = {
    color: "#898989",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    lineHeight: "22px",
    marginTop: "12px",
    marginBottom: "24px",
};

const code = {
    display: "inline-block",
    padding: "16px 4.5%",
    width: "90.5%",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
    border: "1px solid #eee",
    color: "#333",
};