import { createClient } from "contentful";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const getHeaderContent = async () => {
    const response = await client.getEntries({
        content_type: "header",
    });

    console.log(response.items);

    return response.items;
};

export { getHeaderContent };
