export type CartProduct = {
    name: string;
    price: number;
    slug: string;
    quantity: number;
    images?: {
        id?: number;
        url: string;
    };
};

export interface IProduct {
    name?: string;
    id?: string;
    slug: string;
    productVariations: ProductVariation[];
}

export type ProductVariation = {
    name: string;
    price: number;
    slug: string;
    description?: string;
    id?: string;
    variation?: "Cream" | "Green" | "White";
    images?: [
        {
            id?: number;
            url: string;
            width?: number;
            height?: number;
        }
    ];
};
