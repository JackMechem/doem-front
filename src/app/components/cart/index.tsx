"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import styles from "./cart.module.css";
import { BsCart2 } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import Hydration from "../hydration";
import { loadStripe } from "@stripe/stripe-js";
import { AnimatePresence, motion } from "framer-motion";
import loader from "../../../assets/loader.gif";
import getStripe from "@/lib/stripe/get-stripe";

const Cart = () => {
    const { cartProducts, addToCart, removeFromCart } = useCartStore();
    const [cartIsVisible, setCartIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckoutClick = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const stripe = await getStripe();

        const session = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cartProducts: [...cartProducts],
            }),
        }).then((resp) => resp.json());

        await stripe?.redirectToCheckout({
            sessionId: session.session.id,
        });
    };

    return (
        <Hydration>
            <div>
                {isLoading ? (
                    <div
                        style={{
                            zIndex: "400000000000000",
                            position: "fixed",
                            backgroundColor: "#F3F2E2",
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={loader.src}
                            style={{ width: "30vw", height: "auto", objectFit: "contain" }}
                        />
                    </div>
                ) : (
                    ""
                )}
                <div
                    className={styles.cartLogo}
                    onClick={() => {
                        setCartIsVisible(!cartIsVisible);
                    }}
                >
                    <BsCart2 width={"auto"} height={"100%"} />
                    {cartProducts.length !== 0 ? (
                        <div className={styles.cartCount}>{cartProducts.length}</div>
                    ) : (
                        ""
                    )}
                </div>

                <AnimatePresence initial={false}>
                    {cartIsVisible && (
                        <motion.div
                            transition={{ duration: 0.1 }}
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 300 }}
                            layout
                        >
                            <div
                                className={styles.cartMenu}
                                onMouseLeave={() => {
                                    setCartIsVisible(false);
                                }}
                            >
                                {cartProducts
                                    ? cartProducts.map((cartProduct) => (
                                          <div
                                              key={cartProduct.slug}
                                              className={styles.cartMenuItem}
                                          >
                                              {cartProduct.name}{" "}
                                              <div className={styles.cartItemQuantity}>
                                                  {"x"}
                                                  {cartProduct.quantity}
                                              </div>
                                              <div
                                                  className={styles.cartRemoveItem}
                                                  onClick={() => {
                                                      removeFromCart(cartProduct);
                                                  }}
                                              >
                                                  <FiTrash2 />
                                              </div>
                                          </div>
                                      ))
                                    : ""}
                                {cartProducts.length !== 0 ? (
                                    <div
                                        className={styles.checkoutButton}
                                        onClick={handleCheckoutClick}
                                    >
                                        checkout
                                    </div>
                                ) : (
                                    <div>no items in cart :(</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Hydration>
    );
};

export default Cart;
