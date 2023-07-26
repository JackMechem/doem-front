import styles from "./page.module.css";
import { gql } from "graphql-request";
import { graphcms } from "@/lib/graphcms/client";
import { IProduct, IProductCategory } from "@/types";
import ProductCard from "../components/productCard";
import { PageWrapper } from "../components/pageWrapper";
import ShopVideo from "../components/shopVideo";
import { useSearchParams } from "next/navigation";
import OrderCompleted from "../components/orderCompleted";
import { GraphQLClient } from "graphql-request";
import { NextPage } from "next";

const mutGraphCms = new GraphQLClient(`${process.env.GRAPH_CMS_ENDPOINT}`, {
    headers: {
        Authorization: `${process.env.STRIPE_MUTATION_AUTH}`,
    },
});

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

const getOrder = async (stripeId: string) => {
    const order: any = await mutGraphCms.request(
        `
            query OrderQuery($stripeId: String!) {
                order(where: {stripeCheckoutId: $stripeId}) {
                    id
                    stripeCheckoutId
                    total
                    email
                    orderItems {
                        name
                        quantity
                        total
                    }
                }
            }
    `,
        {
            stripeId: stripeId,
        }
    );

    return order.order;
};

interface Props {
    searchParams?: {
        id?: string;
    };
}

const Shop = async ({ searchParams }: Props) => {
    const productCategories = await getProducts();

    const stripeCheckoutId = searchParams?.id;

    let order: any;

    if (stripeCheckoutId) {
        order = await getOrder(stripeCheckoutId);
    }
    console.log(order);

    if (searchParams)
        return (
            <PageWrapper>
                <OrderCompleted order={order} />
                {productCategories.map((category) => {
                    return (
                        <>
                            <div key={category.id} className={styles.container}>
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
            </PageWrapper>
        );
};

export default Shop;
