import { CartProduct } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { ReactNode } from "react";
import styles from "./addToCart.module.css";

const AddToCartButton = ({
    children,
    cartInfo,
}: {
    children: ReactNode;
    cartInfo: CartProduct;
}) => {
    const { cartProducts, addToCart, removeFromCart } = useCartStore();

    return (
        <div>
            <div onClick={() => addToCart(cartInfo)} className={styles.addToCartButton}>
                {children}{" "}
                {(cartInfo.price / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </div>
        </div>
    );
};

export default AddToCartButton;
