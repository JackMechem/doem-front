"use client";

import { useState } from "react";

import { IProduct } from "@/types";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    product: IProduct;
}

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
};

const ProductCard: NextPage<Props> = ({ product }) => {
    const [currentVar, setCurrentVar] = useState(0);
    const [thumbIndex, setThumbIndex] = useState(0);
    return (
        <Link key={product.id} href={`/shop/${product.slug}`}>
            <div key={product.id} className={styles.card}>
                <img
                    src={product.productVariations[currentVar].images![thumbIndex].url}
                    width={product.productVariations[currentVar].images![thumbIndex].width}
                    height={product.productVariations[currentVar].images![thumbIndex].height}
                    alt=""
                    onMouseEnter={() => {
                        setThumbIndex(1);
                    }}
                    onMouseLeave={() => {
                        setThumbIndex(0);
                    }}
                />
                <div className={styles.infoContainer}>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.price}>
                        {(product.productVariations[0].price / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        }) ?? "Price Not Avalible"}
                    </div>
                    <div className={styles.variations}>
                        {product.productVariations.map((variation: any, index: number) => (
                            <div
                                key={variation.variation}
                                onMouseEnter={() => {
                                    setCurrentVar(index);
                                }}
                                onMouseLeave={() => {
                                    setCurrentVar(0);
                                }}
                            >
                                {variation.variation}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
