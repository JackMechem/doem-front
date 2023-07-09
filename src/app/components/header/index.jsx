import { graphcms } from "@/lib/graphcms/client";
import { gql } from "graphql-request";
import Link from "next/link";
import Cart from "../cart";
import styles from "./Header.module.css";

const getHeaderContent = async () => {
    const header = await graphcms.request(
        gql`
            query HeaderQuery($name: String!) {
                header(where: { name: $name }) {
                    name
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

    return header.header;
};

const Header = async () => {
    const headerContent = await getHeaderContent();
    return (
        <div className={styles.header}>
            <Link href={"/"}>
                <div className={styles.logo}>
                    <img src={headerContent.logo.url} height="100%" />
                </div>
            </Link>

            <div className={styles.headerLinkContainer}>
                <Link href={"/shop"}>
                    <div className={styles.headerLink}>
                        <img src={headerContent.shopLogo.url} />
                        SHOP
                    </div>
                </Link>
                <Link href={"/policy"}>
                    <div className={styles.headerLink}>
                        <img src={headerContent.policyLogo.url} />
                        POLICY
                    </div>
                </Link>
                <Link href={"/about"}>
                    <div className={styles.headerLink}>
                        <img src={headerContent.aboutLogo.url} />
                        ABOUT
                    </div>
                </Link>
            </div>
            <div>
                <Cart />
            </div>
        </div>
    );
};

export default Header;
