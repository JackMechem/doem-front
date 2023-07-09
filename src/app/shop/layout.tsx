import { Jost } from "next/font/google";
import Header from "../components/header";

export const metadata = {
    title: "Doem",
    description: "Doem Shop",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <>{children}</>
        </>
    );
}