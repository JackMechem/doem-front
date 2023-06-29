import { loadStripe } from "@stripe/stripe-js";
import styles from "./BuyButton.module.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const BuyButton = ({ slug, buttonText }) => {
    const handleClick = async (e) => {
        e.preventDefault();
        const stripe = await stripePromise;

        const session = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slug: slug,
            }),
        }).then((resp) => resp.json());

        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    };

    return (
        <div>
            <div onClick={handleClick} className={styles.buyButton}>
                {buttonText}
            </div>
        </div>
    );
};

export default BuyButton;
