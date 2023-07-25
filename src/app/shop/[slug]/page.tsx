import { graphcms } from "@/lib/graphcms/client";
import { gql } from "graphql-request";
import styles from "./page.module.css";
import Image from "next/image";
import ProductPageContent from "@/app/components/productPageContent";
import { IProduct } from "@/types";
import { PageWrapper } from "@/app/components/pageWrapper";

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

const getProduct = async (slug: string) => {
    const { product }: { product: IProduct } = await graphcms.request(
        gql`
            query ProductPageQuery($slug: String!) {
                product(where: { slug: $slug }) {
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
        `,
        {
            slug: slug,
        }
    );
    return product;
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const product = await getProduct(slug);

    return (
        <PageWrapper>
            <ProductPageContent product={product} />
        </PageWrapper>
    );
};

export default ProductPage;

export const generateStaticParams = async () => {
    const products = await getProducts();

    const paths = products.map((project: any) => ({
        slug: project.slug,
    }));
    return paths;
};
