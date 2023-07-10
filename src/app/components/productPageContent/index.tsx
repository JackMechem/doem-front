"use client";

import Image from "next/image";
import styles from "./ProductPageContent.module.css";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CartProduct, IProduct, IRockButtons, ProductVariation, RockImage } from "@/types";
import Hydration from "../hydration";
import AddToCartButton from "../addToCartButton";
import ReactMarkdown from "react-markdown";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductPageContent = ({
    product: product,
    rockButtons: rockButtons,
}: {
    product: any;
    rockButtons: IRockButtons;
}) => {
    const [currentVariation, setCurrentVariation] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);

    const { cartProducts, addToCart, removeFromCart } = useCartStore();

    const productInfo: CartProduct = {
        name: product.productVariations[currentVariation].name,
        slug: product.productVariations[currentVariation].slug,
        price: product.productVariations[currentVariation].price,
        quantity: 1,
    };

    return (
        <Hydration>
            <div className={styles.mainContainer}>
                <div className={styles.photoSecector}>
                    {product.productVariations[currentVariation].images.map(
                        (image: any, index: number) => {
                            return (
                                <img
                                    key={image.id}
                                    src={image.url}
                                    onClick={() => {
                                        setImageIndex(index);
                                    }}
                                />
                            );
                        }
                    )}
                </div>
                <div className={styles.imageContainer}>
                    <img
                        src={product.productVariations[currentVariation].images[imageIndex].url}
                        width={product.productVariations[currentVariation].images[imageIndex].width}
                        height={
                            product.productVariations[currentVariation].images[imageIndex].height
                        }
                        alt="none"
                    ></img>
                    <div>
                        <div
                            className={styles.leftArrow}
                            onClick={() => {
                                if (imageIndex > 0) {
                                    setImageIndex((c) => c - 1);
                                }
                            }}
                        >
                            <IoIosArrowBack />
                        </div>
                        <div
                            className={styles.rightArrow}
                            onClick={() => {
                                if (
                                    imageIndex <
                                    product.productVariations[currentVariation].images.length - 1
                                ) {
                                    setImageIndex((c) => c + 1);
                                }
                            }}
                        >
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.productVariation}>
                        {product.productVariations[currentVariation].name}
                    </div>
                    <div className={styles.variationContainer}>
                        {rockButtons.rockImages.map((rockImage: RockImage, index: number) => (
                            <div className={styles.rockContainer} key={rockImage.id}>
                                <img
                                    src={rockImage.image.url}
                                    width={100}
                                    height={100}
                                    alt=""
                                    className={styles.variationButton}
                                    onClick={() => {
                                        setCurrentVariation(index);
                                        setImageIndex(0);
                                    }}
                                ></img>
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
