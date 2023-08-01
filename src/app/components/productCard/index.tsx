"use client";

import { useEffect, useState } from "react";

import { IProduct, VariationButton } from "@/types";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { abort } from "process";

interface Props {
    product: IProduct;
}

const ProductCard: NextPage<Props> = ({ product }) => {
    const [currentVar, setCurrentVar] = useState(0);
    const [thumbIndex, setThumbIndex] = useState(0);

    useEffect(() => {
        if (product.variationButtonSet) {
            setCurrentVar(
                Math.floor(
                    Math.random() *
                        (product.variationButtonSet.variationButtons.length - 1 - 0 + 1) +
                        0
                )
            );
            return;
        } else {
            return;
        }
    }, []);
    return (
        <Link key={product.id} href={`/shop/${product.slug}`}>
            <div key={product.id} className={styles.card}>
                <img
                    key={thumbIndex + currentVar}
                    src={product.productVariations[currentVar].images![thumbIndex].url}
                    width={product.productVariations[currentVar].images![thumbIndex].width}
                    height={product.productVariations[currentVar].images![thumbIndex].height}
                    alt={product.productVariations[currentVar].slug}
                    loading="lazy"
                    onMouseEnter={() => {
                        setThumbIndex(1);
                    }}
                    onMouseLeave={() => {
                        setThumbIndex(0);
                    }}
                />
                <div className={styles.infoContainer}>
                    <div className={styles.name}>{product.name}</div>
                    {product.variationButtonSet && (
                        <div className={styles.variations}>
                            {product.variationButtonSet.variationButtons.map(
                                (but: VariationButton, index: number) => (
                                    <div className={styles.rock} key={but.id}>
                                        <img
                                            src={but.image.url}
                                            alt={but.variation}
                                            width={but.image.width}
                                            height={but.image.height}
                                            key={but.name}
                                            onMouseEnter={() => {
                                                setCurrentVar(index);
                                            }}
                                        ></img>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                    <div className={styles.price}>
                        {(product.productVariations[0].price / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        }) ?? "Price Not Avalible"}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
