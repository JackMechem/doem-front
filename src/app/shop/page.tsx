import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { gql } from "graphql-request";
import { graphcms } from "@/lib/graphcms/client";
import { IProduct } from "@/types";
import { useState } from "react";
import { NextPage } from "next";
import ProductCard from "../components/productCard";

const getProducts = async () => {
    const { products: products }: { products: IProduct[] } = await graphcms.request(
        gql`
            {
                products {
                    id
                    name
                    slug
                    productVariations {
                        description
                        id
                        name
                        price
                        slug
                        variation
                        images {
                            height
                            width
                            id
                            url
                        }
                    }
                }
            }
        `
    );

    return products;
};

const Shop = async () => {
    const products = await getProducts();

    return (
        <div className={styles.container}>
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
};

export default Shop;
