import { graphcms } from "@/lib/graphcms/client";
import { IPage } from "@/types";
import Header from "../components/header";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "./page.module.css";
import { PageWrapper } from "../components/pageWrapper";

const getPageData = async (slug: string) => {
    const { page }: { page: IPage } = await graphcms.request(
        `
        query PageQuery($slug: String!) {
            page(where: { slug: $slug }) {
                id
                slug
                title
                body {
                    markdown
                }
            }
        }
    `,
        {
            slug: slug,
        }
    );
    return page;
};

const Page = async () => {
    const page = await getPageData("about");
    return (
        <div>
            <PageWrapper>
                <div className={styles.container}>
                    <div className={styles.title}>{page.title}</div>
                    {page.body.map((body) => (
                        <div className={styles.markdown} key={body.markdown}>
                            <ReactMarkdown className={styles.reactMarkdown}>
                                {body.markdown}
                            </ReactMarkdown>
                        </div>
                    ))}
                </div>
            </PageWrapper>
        </div>
    );
};

export default Page;
