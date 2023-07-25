import styles from "./page.module.css";
import { gql } from "graphql-request";
import { graphcms } from "@/lib/graphcms/client";
import { IProduct, IProductCategory } from "@/types";
import ProductCard from "../components/productCard";
import { PageWrapper } from "../components/pageWrapper";
import ShopVideo from "../components/shopVideo";

const getProducts = async () => {
    const { productCategories: productCategories }: { productCategories: IProductCategory[] } =
        await graphcms.request(
            gql`
                {
                    productCategories {
                        id
                        name
                        slug
                        video {
                            id
                            width
                            height
                            url
                        }
                        mobileGif {
                            id
                            width
                            height
                            url
                        }
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
                            variationButtonSet {
                                name
                                slug
                                variationButtons {
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
                    }
                }
            `
        );

    return productCategories;
};

const Shop = async () => {
    const productCategories = await getProducts();
    return (
        <PageWrapper>
            {productCategories.map((category) => {
                return (
                    <div key={category.id} className={styles.container}>
                        <ShopVideo
                            desktopUrl={category.video.url}
                            mobileUrl={category.mobileGif.url}
                        />
                        {category.products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                );
            })}
        </PageWrapper>
    );
};

export default Shop;
