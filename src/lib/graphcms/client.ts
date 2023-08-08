import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(`${process.env.GRAPH_CMS_ENDPOINT}`, {
    headers: {
        Authorization: `${process.env.GRAPH_CMS_PRODUCTION_AUTH}`,
    },
    fetch,
});

export { graphcms };
