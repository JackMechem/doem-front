"use client";

import { IHeaderContent } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cart from "../cart";
import MobileMenu from "../mobileMenu";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Props {
    headerContent: IHeaderContent;
}

const Header = ({ headerContent }: Props) => {
    const [hamIsVisible, setHamIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setHamIsVisible(false);
    }, [pathname]);

    return (
        <div className={styles.header}>
            <Link href={"/"}>
                <div className={styles.logo}>
                    <Image
                        width={headerContent.logo.width}
                        height={headerContent.logo.height}
                        alt="header logo"
                        src={headerContent.logo.url}
                    />
                </div>
            </Link>

            <div
                className={styles.hamLogo}
                onClick={() => {
                    setHamIsVisible((c) => !c);
                }}
            >
                <div className={styles.hamLine}></div>
                <div className={styles.hamLine}></div>
                <div className={styles.hamLine}></div>
            </div>
            <AnimatePresence initial={false}>
                {hamIsVisible && (
                    <motion.div
                        initial={{ y: -100, opacity: 0, zIndex: "1000" }}
                        animate={{ y: 0, opacity: 1, zIndex: "1000" }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ zIndex: 10000 }}
                    >
                        <MobileMenu
                            logoUrl={headerContent.logo.url}
                            companyDescription={headerContent.companyDescription}
                            aboutLogo={headerContent.aboutLogo.url}
                            shopLogo={headerContent.shopLogo.url}
                            policyLogo={headerContent.policyLogo.url}
                            closeStateChanger={setHamIsVisible}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.headerLinkContainer}>
                <Link href={"/shop"}>
                    <div className={styles.headerLink}>
                        <Image
                            alt="shop nav logo"
                            width={headerContent.shopLogo.width}
                            height={headerContent.shopLogo.height}
                            src={headerContent.shopLogo.url}
                        />
                        SHOP
                    </div>
                </Link>
                <Link href={"/policy"}>
                    <div className={styles.headerLink}>
                        <Image
                            alt="policy nav logo"
                            width={headerContent.policyLogo.width}
                            height={headerContent.policyLogo.height}
                            src={headerContent.policyLogo.url}
                        />
                        POLICY
                    </div>
                </Link>
                <Link href={"/about"}>
                    <div className={styles.headerLink}>
                        <Image
                            alt="about nav logo"
                            width={headerContent.shopLogo.width}
                            height={headerContent.shopLogo.height}
                            src={headerContent.aboutLogo.url}
                        />
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
