"use client";

import { useState } from "react";

import { IProduct, IRockButtons, RockImage } from "@/types";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    product: IProduct;
    rocks: IRockButtons;
}

const ProductCard: NextPage<Props> = ({ product, rocks }) => {
    const [currentVar, setCurrentVar] = useState(0);
    const [thumbIndex, setThumbIndex] = useState(0);
    console.log(rocks);
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
                        {rocks.rockImages.map((rockImage: RockImage, index: number) => (
                            <div className={styles.rock} key={rockImage.id}>
                                <img
                                    src={rockImage.image.url}
                                    width={10}
                                    height={10}
                                    alt={rockImage.variation}
                                    onMouseEnter={() => {
                                        setCurrentVar(index);
                                    }}
                                    onMouseLeave={() => {
                                        setCurrentVar(0);
                                    }}
                                ></img>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;