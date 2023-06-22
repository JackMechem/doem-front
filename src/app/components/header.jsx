import Link from "next/link";
import styles from "./Header.module.css";
import { getHeaderContent } from "@/lib/contentful/utils.js";

const Header = async () => {
    const headerContent = await getHeaderContent();
    return (
        <div className={styles.header}>
            <Link href={"/"}>
                <div className={styles.logo}>
                    <img src={headerContent[0].fields.logo.fields.file.url} height="100%" />
                </div>
            </Link>

            <div className={styles.headerLinkContainer}>
                <Link href={"/shop"}>
                    <div className={styles.headerLink}>
                        <img src={headerContent[0].fields.shopLogo.fields.file.url} />
                        SHOP
                    </div>
                </Link>
                <Link href={"/policy"}>
                    <div className={styles.headerLink}>
                        <img src={headerContent[0].fields.policyLogo.fields.file.url} />
                        POLICY
                    </div>
                </Link>
                <Link href={"/about"}>
                    <div className={styles.headerLink}>
                        <img src={headerContent[0].fields.aboutLogo.fields.file.url} />
                        ABOUT
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
