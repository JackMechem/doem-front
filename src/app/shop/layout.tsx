import { Jost } from "next/font/google";
import { PageWrapper } from "../components/pageWrapper";

export const metadata = {
    title: "Doem",
    description: "Doem Shop",
};

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <>{children}</>
        </>
    );
}
