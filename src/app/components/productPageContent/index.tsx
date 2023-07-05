"use client";

import Image from "next/image";
import styles from "./ProductPageContent.module.css";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CartProduct, IProduct, IRockButtons, ProductVariation, RockImage } from "@/types";
import Hydration from "../hydration";
import AddToCartButton from "../addToCartButton";
import ReactMarkdown from "react-markdown";

const ProductPageContent = ({
    product: product,
    rockButtons: rockButtons,
}: {
    product: any;
    rockButtons: IRockButtons;
}) => {
    const [currentVariation, setCurrentVariation] = useState(0);
    const { cartProducts, addToCart, removeFromCart } = useCartStore();

    const productInfo: CartProduct = {
        name: product.productVariations[currentVariation].name,
        slug: product.productVariations[currentVariation].slug,
        price: product.productVariations[currentVariation].price,
        quantity: 1,
    };

    return (
        <Hydration>
            <div className={styles.leftContainer}>
                <div className={styles.imageContainer}>
                    <Image
                        src={product.productVariations[currentVariation].images[0].url}
                        width={product.productVariations[currentVariation].images[0].width}
                        height={product.productVariations[currentVariation].images[0].height}
                        alt="none"
                    />
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.productVariation}>
                        {product.productVariations[currentVariation].name}
                    </div>
                    <div className={styles.variationContainer}>
                        {rockButtons.rockImages.map((rockImage: RockImage, index: number) => (
                            <div className={styles.rockContainer} key={rockImage.id}>
                                <Image
                                    src={rockImage.image.url}
                                    width={100}
                                    height={100}
                                    alt=""
                                    className={styles.variationButton}
                                    onClick={() => {
                                        setCurrentVariation(index);
                                    }}
                                ></Image>
                                <p className={styles.underText}>{rockImage.variation}</p>
                            </div>
                        ))}
                    </div>
                    <ReactMarkdown className={styles.description}>
                        {product.productVariations[currentVariation].description}
                    </ReactMarkdown>
                    <AddToCartButton cartInfo={productInfo}>add to cart {"-"}</AddToCartButton>
                </div>
            </div>
        </Hydration>
    );
};

export default ProductPageContent;
