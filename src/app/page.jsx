import "./page.module.css";
import { getProducts } from "@/lib/swell/products";
import Link from "next/link";

const HomePage = async () => {
    const { results: products } = await getProducts({ page: 1 });
    console.log(products[0].variants);
    return (
        <div>
            {products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`}>
                    <h1>{product.name}</h1>
                    <img src={product.images[0].file?.url} width="500px" />
                    <p>
                        {"$"}
                        {product?.purchase_options?.standard?.price ?? "Price Not Avalible"}{" "}
                        {product.currency}
                    </p>
                    <div>Variants: {product.variants.count}</div>
                </Link>
            ))}
        </div>
    );
};

export default HomePage;
