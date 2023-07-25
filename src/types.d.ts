export interface IImage {
    id: string;
    url: string;
    width?: number;
    height?: number;
}

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

export interface IProductCategory {
    id: string;
    name: string;
    slug: string;
    video: IImage;
    mobileGif: IImage;
    products: IProduct[];
}

export interface IProduct {
    name?: string;
    id?: string;
    slug: string;
    productVariations: ProductVariation[];
    variationButtonSet: VariationButtonSet;
}

export interface ProductVariation {
    name: string;
    price: number;
    slug: string;
    description?: string;
    id?: string;
    variation?: "Cream" | "Green" | "White";
    weight: number;
    images?: IImage[];
}

export interface VariationButtonSet {
    name: string;
    slug: string;
    variationButtons: VariationButton[];
}

export interface VariationButton {
    id: string;
    name: string;
    variation: string;
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
    headerLogo: IImage;
}

export interface IPageBody {
    markdown: string;
}

export interface ILandingPage {
    backgroundColor: {
        css: string;
        hex: string;
    };
    slug: string;
    companyName: string;
    description: string;
    candleGif: IImage;
    rockButton: IImage;
}

export interface IHeaderContent {
    name: string;
    companyDescription: string;
    logo: IImage;
    shopLogo: IImage;
    policyLogo: IImage;
    aboutLogo: IImage;
}
