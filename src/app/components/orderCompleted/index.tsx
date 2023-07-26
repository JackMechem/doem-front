"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface OrderCompletedProps {
    order: any;
}

const OrderCompleted = ({ order }: OrderCompletedProps) => {
    const [isOpen, setIsOpen] = useState(() => {
        if (order) {
            return true;
        } else {
            return false;
        }
    });

    return (
        <>
            {isOpen && (
                <div className={styles.OrderCompletedContainer}>
                    <div
                        className={styles.close}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        <IoClose />
                    </div>
                    <h1>Order Completed</h1>
                    <p>Thank You For Shopping At Doem!</p>
                    <p>
                        A confirmation email will be sent to: <br /> {order.email}
                    </p>
                    <h3>Your Order Items:</h3>
                    <div className={styles.items}>
                        {order.orderItems.map((item: any) => {
                            return (
                                <p key={item.name}>
                                    {item.name} x{item.quantity}
                                </p>
                            );
                        })}
                    </div>
                    <h3>Your Order Number: </h3>
                    <code className={styles.orderId}>{order.stripeCheckoutId}</code>
                </div>
            )}
        </>
    );
};

export default OrderCompleted;
