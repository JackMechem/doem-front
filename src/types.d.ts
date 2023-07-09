export interface CartProduct {
    name: string;
    price: number;
    slug: string;
    quantity: number;
    images?: {
        id?: number;
        url: string;
    };
}

export interface IProduct {
    name?: string;
    id?: string;
    slug: string;
    productVariations: ProductVariation[];
}

export interface ProductVariation {
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
}

export interface IRockButtons {
    name: string;
    slug: string;
    rockImages: RockImage[];
}

export interface RockImage {
    id: string;
    name: string;
    variation: "Green" | "Cream" | "White";
    image: {
        id: string;
        width: number;
        height: number;
        url: string;
    };
}

export interface IPage {
    id: string;
    slug: string;
    title: string;
    body: IPageBody[];
    headerLogo: {
        id: string;
        width: number;
        height: number;
        url: string;
    };
}

export interface IPageBody {
    markdown: string;
}