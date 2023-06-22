import "./globals.css";
import { Jost } from "next/font/google";
import Header from "./components/header";
import { Head } from "next/document";

const jost = Jost({ subsets: ["latin"], display: "swap" });

export const metadata = {
    title: "Doem",
    description: "Doem Shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={jost.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
