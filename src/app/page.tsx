"use client";

import "./page.module.css";
import { useSearchParams } from "next/navigation";

const HomePage = async () => {
    const searchParams = useSearchParams();

    const stripeSessionId = searchParams.get("id");

    const handleClick = async (e: any) => {
        e.preventDefault();

        await fetch("/api/create-easypost-label", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionId: stripeSessionId,
            }),
        }).then((resp) => resp.json());
    };

    return (
        <div>
            Home Page {stripeSessionId ? <button onClick={handleClick}>Create Label</button> : ""}
        </div>
    );
};

export default HomePage;
