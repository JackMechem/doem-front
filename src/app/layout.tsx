import "./globals.css";
import { Jost } from "next/font/google";
import Header from "./components/header";

const jost = Jost({ subsets: ["latin"] });

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
