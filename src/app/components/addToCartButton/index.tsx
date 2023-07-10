import { CartProduct } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { ReactNode, useState } from "react";
import styles from "./addToCart.module.css";
import Notification from "../notification";
import { AnimatePresence, motion } from "framer-motion";

const AddToCartButton = ({
    children,
    cartInfo,
}: {
    children: ReactNode;
    cartInfo: CartProduct;
}) => {
    const { cartProducts, addToCart, removeFromCart } = useCartStore();
    const [showNotification, setShowNotification] = useState(false);

    return (
        <div>
            <div
                onClick={() => {
                    addToCart(cartInfo);
                    setShowNotification(true);
                }}
                className={styles.addToCartButton}
            >
                {children}{" "}
                {(cartInfo.price / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </div>
            <AnimatePresence initial={false}>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                        style={{ position: "fixed", top: "0px", right: "0px", width: "600px" }}
                        onAnimationComplete={() => {
                            setShowNotification(!showNotification);
                        }}
                    >
                        <Notification>added to cart</Notification>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddToCartButton;
