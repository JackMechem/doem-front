import styles from "./page.module.css";
import { graphcms } from "@/lib/graphcms/client";
import { ILandingPage } from "@/types";
import { Sarina } from "next/font/google";
import Link from "next/link";

const sarina = Sarina({
    subsets: ["latin"],
    weight: ["400"],
});

const getPageData = async () => {
    const { landingPage }: { landingPage: ILandingPage } = await graphcms.request(
        `
        query LandingPageQuery($slug: String!) {
            landingPage(where: { slug: $slug }) {
                id
                companyName
                description
                rockButton {
                    id
                    width
                    height
                    url
                }
                candleGif {
                    id
                    width
                    height
                    url
                }
                backgroundColor {
                    css
                    hex
                }
            }
        }
    `,
        {
            slug: "landing-page",
        }
    );
    return landingPage;
};

const HomePage = async () => {
    const page = await getPageData();
    return (
        <div className={styles.mainContainer} style={{ backgroundColor: page.backgroundColor.css }}>
            <img
                src={page.candleGif.url}
                height={page.candleGif.height}
                width={page.candleGif.width}
                loading="eager"
            />
            <div className={styles.rightContainer}>
                <div className={styles.companyName + " " + sarina.className}>
                    {page.companyName}
                </div>
                <div className={styles.description}>{page.description}</div>
                <Link href={"/shop"}>
                    <img src={page.rockButton.url} width={"auto"} height={"auto"} />
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
