import { graphcms } from "@/lib/graphcms/client";
import { gql } from "graphql-request";
import styles from "./page.module.css";
import Image from "next/image";
import ProductPageContent from "@/app/components/productPageContent";

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
    const product: any = await graphcms.request(
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
                }
            }
        `,
        {
            slug: slug,
        }
    );
    return product.product;
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const product = await getProduct(slug);

    console.log(product);
    return (
        <div>
            <ProductPageContent product={product} />
        </div>
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
