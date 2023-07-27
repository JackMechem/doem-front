"use client";

import { IProductCategory } from "@/types";
import React, { useRef } from "react";
import ProductCard from "../productCard";
import ShopVideo from "../shopVideo";
import styles from "./page.module.css";

interface ShopPageContentProps {
    productCategories: IProductCategory[];
}

const ShopPageContent = ({ productCategories }: ShopPageContentProps) => {
    let refs: any = useRef([]);

    refs.current = productCategories.map(
        (category, index: number) => (refs.current[index] = React.createRef())
    );

    const handleCatClick = (index: number) => {
        refs.current[index].current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className={styles.catContainer}>
                {productCategories.map((category, index: number) => (
                    <p
                        className={styles.cat}
                        key={category.id}
                        onClick={() => {
                            handleCatClick(index);
                        }}
                    >
                        {category.name}
                    </p>
                ))}
            </div>
            {productCategories.map((category, index: number) => {
                return (
                    <>
                        <div
                            ref={refs.current[index]}
                            key={category.id}
                            className={styles.container}
                        >
                            <ShopVideo
                                desktopUrl={category.video.url}
                                mobileUrl={category.mobileGif.url}
                            />
                            {category.products.map((product) => (
                                <ProductCard product={product} key={product.id} />
                            ))}
                        </div>
                    </>
                );
            })}
        </>
    );
};

export default ShopPageContent;
