import { getProductBySlugOrId } from "@/lib/swell/products";

const ProductPage = async ({ params }) => {
    const product = await getProductBySlugOrId(params.slug);

    return (
        <div>
            <h1>{product.name}</h1>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductPage;
