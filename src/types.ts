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
    slug: string;
    productVariation: ProductVariation;
}

export type ProductVariation = {
    name: string;
    price: number;
    slug: string;
    variation?: "Cream" | "Green" | "White";
    images?: [
        {
            id?: number;
            url: string;
        }
    ];
};
