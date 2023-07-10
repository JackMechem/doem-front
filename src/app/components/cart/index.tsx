"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import styles from "./cart.module.css";
import { BsCart2 } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import Hydration from "../hydration";
import { loadStripe } from "@stripe/stripe-js";
import { AnimatePresence, motion } from "framer-motion";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);
const Cart = () => {
    const { cartProducts, addToCart, removeFromCart } = useCartStore();
    const [cartIsVisible, setCartIsVisible] = useState(false);

    const handleCheckoutClick = async (e: any) => {
        e.preventDefault();
        const stripe = await stripePromise;

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
