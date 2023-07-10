import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { gql } from "graphql-request";
import { graphcms } from "@/lib/graphcms/client";
import { IProduct, IRockButtons } from "@/types";
import { useState } from "react";
import { NextPage } from "next";
import ProductCard from "../components/productCard";
import { PageWrapper } from "../components/pageWrapper";

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

const getRocks = async (slug: string) => {
    const { rockButtonSet }: { rockButtonSet: IRockButtons } = await graphcms.request(
        `
            query RockButtonsQuery($slug: String!) {
                rockButtonSet(where: { slug: $slug }) {
                    name
                    slug
                    rockImages {
                        id
                        name
                        variation
                        image {
                            id
                            width
                            height
                            url
                        }
                    }
                }
            }
        `,
        {
            slug: slug,
        }
    );

    return rockButtonSet;
};

const Shop = async () => {
    const products = await getProducts();
    const rocks = await getRocks("card");

    return (
        <PageWrapper>
            <div className={styles.container}>
                {products.map((product) => (
                    <ProductCard product={product} rocks={rocks} key={product.id} />
                ))}
            </div>
        </PageWrapper>
    );
};

export default Shop;
