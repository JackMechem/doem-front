import "./page.module.css";
import { getProducts } from "@/lib/swell/products";
import Link from "next/link";

const HomePage = async () => {
    const { results: products } = await getProducts({ page: 1 });
    return (
        <div>
            {products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                </Link>
            ))}
        </div>
    );
};

export default HomePage;
