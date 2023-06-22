import { getProducts } from "@/lib/swell/products";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const Shop = async () => {
    const { results: products } = await getProducts({ page: 1 });
    console.log(products[0].variants);
    return (
        <div className={styles.container}>
            {products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`}>
                    <div className={styles.card}>
                        <Image
                            src={product.images[0].file.url}
                            width={product.images[0].file.width}
                            height={1638}
                        />
                        <p>{product.name}</p>
                        <p>
                            {"$"}
                            {product.purchase_options.standard.price ?? "Price Not Avalible"}{" "}
                            {product.currency}
                        </p>
                        <div>Variants: {product.variants.count}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Shop;
