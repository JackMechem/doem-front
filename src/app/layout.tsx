import "./globals.css";
import { Jost } from "next/font/google";
import Header from "./components/header";
import getHeaderContent from "./components/header/getHeaderContent";
import Head from "next/head";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
    title: "Doem",
    description: "Doem Shop",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headerContent = await getHeaderContent();
    return (
        <html lang="en">
            <body className={jost.className}>
                <Header headerContent={headerContent} />
                {children}
            </body>
        </html>
    );
}
