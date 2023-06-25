import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { gql } from "graphql-request";
import { graphcms } from "@/lib/graphcms/client";

const getProducts = async () => {
    const { products: products }: { products: any } = await graphcms.request(
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
            {products.map(
                ({
                    id,
                    name,
                    slug,
                    productVariations,
                }: {
                    id: string;
                    name: string;
                    slug: string;
                    productVariations: any[];
                }) => (
                    <Link key={id} href={`/product/${slug}`}>
                        <div className={styles.card}>
                            <Image
                                src={productVariations[0].images[0].url}
                                width={productVariations[0].images[0].width}
                                height={productVariations[0].images[0].height}
                                alt=""
                            />
                            <p>{name}</p>
                            <p>
                                {(productVariations[0].price / 100).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }) ?? "Price Not Avalible"}
                            </p>
                            <div>
                                Variants:{" "}
                                {productVariations.map((variation: any) => (
                                    <div>{variation.variation}</div>
                                ))}
                            </div>
                        </div>
                    </Link>
                )
            )}
        </div>
    );
};

export default Shop;
