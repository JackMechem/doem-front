import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { gql } from "graphql-request";
import { graphcms } from "@/lib/graphcms/client";
import { IProduct } from "@/types";

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
            {products.map(({ id, name, slug, productVariations }) => (
                <Link key={id} href={`/shop/${slug}`}>
                    <div key={id} className={styles.card}>
                        <Image
                            src={productVariations[0].images![0].url}
                            width={productVariations[0].images![0].width}
                            height={productVariations[0].images![0].height}
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
                                <div key={variation.variation}>{variation.variation}</div>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Shop;
