"use client";

import { Suspense, useEffect, useState } from "react";

import { IProduct, VariationButton } from "@/types";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

interface Props {
    product: IProduct;
}

const ProductCard: NextPage<Props> = ({ product }) => {
    const [currentVar, setCurrentVar] = useState(0);
    const [thumbIndex, setThumbIndex] = useState(0);
    const router = useRouter();

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
                {product.productVariations.map((variation: any, variationindex: number) =>
                    variation.images!.map((image: any, index: number) => (
                        <Image
                            key={image.id}
                            src={image.url}
                            width={1920}
                            height={1080}
                            sizes="(max-width: 900px) 90vw, (max-width: 1200px) 40vw, 35vw"
                            alt={product.productVariations[currentVar].slug}
                            onMouseEnter={() => {
                                setThumbIndex(1);
                            }}
                            onMouseLeave={() => {
                                setThumbIndex(0);
                            }}
                            style={
                                index === thumbIndex && variationindex === currentVar
                                    ? {
                                          display: "block",
                                      }
                                    : { display: "none" }
                            }
                        />
                    ))
                )}
                {/* 

                <Image
                    key={thumbIndex + currentVar}
                    src={product.productVariations[currentVar].images![thumbIndex].url}
                    width={1920}
                    height={1080}
                    sizes="(max-width: 900px) 90vw, (max-width: 1200px) 40vw, 35vw"
                    alt={product.productVariations[currentVar].slug}
                    onMouseEnter={() => {
                        setThumbIndex(1);
                    }}
                    onMouseLeave={() => {
                        setThumbIndex(0);
                    }}
                />
                */}
                <div className={styles.infoContainer}>
                    <div className={styles.name}>{product.name}</div>
                    {product.variationButtonSet && (
                        <div className={styles.variations}>
                            {product.variationButtonSet.variationButtons.map(
                                (but: VariationButton, index: number) => (
                                    <div className={styles.rock} key={but.id}>
                                        <Image
                                            src={but.image.url}
                                            alt={but.variation}
                                            width={0}
                                            height={0}
                                            key={but.name}
                                            onMouseEnter={() => {
                                                setCurrentVar(index);
                                            }}
                                        />
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
