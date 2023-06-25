import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(`${process.env.GRAPH_CMS_ENDPOINT}`);

export { graphcms };
