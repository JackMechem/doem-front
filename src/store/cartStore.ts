import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CartProduct } from "@/types";

interface CartState {
    cartProducts: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (product: CartProduct) => void;
}

const updateQuantity = (arr: any, slug: any, updatedData: any) => {
    return arr.map((item: any) => (item.slug === slug ? { ...item, ...updatedData } : item));
};

const useCartStore = create<CartState>()(
    devtools(
        persist(
            (set) => ({
                cartProducts: [],
                addToCart: (product) =>
                    set((state) => {
                        const isPresent = state.cartProducts.find(
                            (prdct) => prdct.slug === product.slug
                        );

                        if (!isPresent) {
                            return {
                                cartProducts: [...state.cartProducts, product],
                            };
                        }

                        const updatedCart = state.cartProducts.map((pro) =>
                            pro.slug === product.slug
                                ? { ...pro, quantity: pro.quantity + product.quantity }
                                : pro
                        );

                        return {
                            ...state,
                            cartProducts: updatedCart,
                        };
                    }),
                removeFromCart: (product) =>
                    set((state) => ({
                        cartProducts: state.cartProducts.filter((pro) => pro.slug !== product.slug),
                    })),
            }),
            {
                name: "cart-storage",
            }
        )
    )
);

export { useCartStore };
