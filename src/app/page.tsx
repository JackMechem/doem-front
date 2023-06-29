import "./page.module.css";
import { useSearchParams } from "next/navigation";

const HomePage = async () => {
    try {
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
    } catch (e) {
        console.log(e);
    }

    return <div>home</div>;
};

export default HomePage;
