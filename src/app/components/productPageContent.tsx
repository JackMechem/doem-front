"use client";

import Image from "next/image";
import styles from "./ProductPageContent.module.css";
import { useState } from "react";
import BuyButton from "./buyButton";

const ProductPageContent = ({ product: product }: { product: any }) => {
    const [currentVariation, setCurrentVariation] = useState(0);

    return (
        <div>
            <h1>{product.name}</h1>
            <h3>Product Variation: {product.productVariations[currentVariation].name}</h3>
            <Image
                src={product.productVariations[currentVariation].images[0].url}
                width={product.productVariations[currentVariation].images[0].width}
                height={product.productVariations[currentVariation].images[0].height}
                alt={""}
                style={{ width: "100%", maxWidth: "60vh", height: "auto" }}
            />
            <p>{product.productVariations[0].description}</p>
            <label>Variations:</label>
            {product.productVariations.map((productVariation: any, index: number) => (
                <button
                    onClick={() => {
                        setCurrentVariation(index);
                    }}
                >
                    {productVariation.variation}
                </button>
            ))}
            <BuyButton
                slug={product.productVariations[currentVariation].slug}
                buttonText={
                    "add to cart - " +
                    (product.productVariations[currentVariation].price / 100).toLocaleString(
                        "en-US",
                        {
                            style: "currency",
                            currency: "USD",
                        }
                    )
                }
            />
        </div>
    );
};

export default ProductPageContent;
