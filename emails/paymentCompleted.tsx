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
    Font,
} from "@react-email/components";
import * as React from "react";
import { currency } from "swell-js";

interface IOrderLineItem {
    currency: string;
    total: string;
    total_price: number;
    quantity: number;
    weight: number;
    weight_unit: "lb";
}

interface Props {
    order: any;
    total: number;
    sessionId: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.SITE_URL}` : "";

export const PaymentCompletedEmail = ({
    order = [
        {
            name: "candle 1",
            quantity: "2",
            productVariation: {
                price: 40000,
            },
        },
        {
            name: "dfh gjf ghjfcandle 2",
            quantity: "2",
            productVariation: {
                price: 40000,
            },
        },
        {
            name: "hghdhd candle 3",
            quantity: "2",
            productVariation: {
                price: 40000,
            },
        },
    ],
    total,
    sessionId = "null",
}: Props) => (
    <Html>
        <Head>
            <Font
                fontFamily="JetBrains Mono"
                fallbackFontFamily="Arial"
                webFont={{
                    url: "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
        </Head>
        <Preview>Order Completed</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>
                    <Link href={baseUrl} target="_blank" style={h1}>
                        doem.
                    </Link>
                </Heading>
                <Text style={{ ...text, marginBottom: "14px" }}>
                    Your Total:{" "}
                    {(total / 100).toLocaleString("en-us", { style: "currency", currency: "USD" })}
                </Text>
                <Text style={{ ...text, marginBottom: "14px" }}>Your Order Items:</Text>

                <code style={code}>
                    {order.map((item: any) => {
                        return (
                            <Text style={{ ...text, margin: "10px 0px", letterSpacing: "0.3px" }}>
                                {item.name} | x{item.quantity} |{" "}
                                {(item.productVariation.price / 100).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </Text>
                        );
                    })}
                </code>
                <Text
                    style={{
                        ...text,
                        color: "#ababab",
                        marginTop: "14px",
                        marginBottom: "16px",
                    }}
                >
                    Thank you for your purchase! You will recieve emails ragarding the status of
                    your shipment.
                </Text>
                <Text style={text}>Your checkout session id:</Text>
                <code style={code}>{sessionId}</code>
                <Text style={footer}>
                    <Link href={baseUrl} target="_blank" style={{ ...link, color: "#898989" }}>
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
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
};

const link = {
    color: "#2754C5",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "14px",
    textDecoration: "underline",
};

const text = {
    color: "#333",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "14px",
    margin: "24px 0",
};

const footer = {
    color: "#898989",
    fontFamily: "JetBrains Mono, monospace",
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
    fontFamily: "JetBrains Mono, monospace",
};
