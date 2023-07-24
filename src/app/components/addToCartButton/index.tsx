import { CartProduct } from "@/types";
import { useCartStore } from "@/store/cartStore";
import React, { ReactNode, useState } from "react";
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
    const [notifications, setNotifications] = useState([]);
    const [timesPressed, setTimesPressed] = useState(0);

    let notification = <Notification>added to cart</Notification>;
    let notificationa = React.cloneElement(notification);

    return (
        <div>
            <div
                onClick={() => {
                    addToCart(cartInfo);
                    setShowNotification(true);
                    setTimesPressed((c) => c + 1);
                }}
                className={styles.addToCartButton}
            >
                {children}{" "}
                {(cartInfo.price / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </div>
            <AnimatePresence initial={false} mode="sync">
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -80 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -80 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        style={{
                            position: "fixed",
                            top: "0px",
                            right: "0px",
                            width: "100%",
                            zIndex: "10000000000",
                        }}
                        onAnimationComplete={() => {
                            setShowNotification(!showNotification);
                        }}
                    >
                        <Notification key={timesPressed}>Added to Cart</Notification>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddToCartButton;
