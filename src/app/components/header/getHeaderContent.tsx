import { graphcms } from "@/lib/graphcms/client";
import { IHeaderContent } from "@/types";
import { gql } from "graphql-request";

const getHeaderContent = async () => {
    const { header }: { header: IHeaderContent } = await graphcms.request(
        gql`
            query HeaderQuery($name: String!) {
                header(where: { name: $name }) {
                    name
                    companyDescription
                    logo {
                        id
                        url
                        width
                        height
                    }
                    shopLogo {
                        id
                        url
                        width
                        height
                    }
                    policyLogo {
                        id
                        url
                        width
                        height
                    }
                    aboutLogo {
                        id
                        url
                        width
                        height
                    }
                }
            }
        `,
        {
            name: "header",
        }
    );

    return header;
};

export default getHeaderContent;
