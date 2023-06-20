import swell from "./client";

export const getProducts = async ({ page = 1, filters = {}, limit = 100 }) => {
    return await swell.products.list({
        page,
        limit,
        $filters: filters,
        expand: ["variants", "categories"],
    });
};

export const getProductBySlugOrId = async (slugOrId) => {
    return await swell.products.get(slugOrId);
};
