"use client";

import { NextPage } from "next";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

interface Props {
    logoUrl: string;
    companyDescription: string;
    aboutLogo: string;
    shopLogo: string;
    policyLogo: string;
}

const MobileMenu: NextPage<Props> = ({
    logoUrl,
    companyDescription,
    aboutLogo,
    shopLogo,
    policyLogo,
}) => {
    const router = useRouter();

    const handleCLick = (href: string) => {
        router.push(href);
    };

    return (
        <div className={styles.hamMenu}>
            <img
                className={styles.hamImg}
                src={logoUrl}
                onClick={() => {
                    handleCLick("/");
                }}
            />
            <div className={styles.hamItemContainer}>
                <div
                    className={styles.hamItem}
                    onClick={() => {
                        handleCLick("/shop");
                    }}
                >
                    <img src={shopLogo} />
                    Shop
                </div>
                <div
                    className={styles.hamItem}
                    onClick={() => {
                        handleCLick("/about");
                    }}
                >
                    <img src={aboutLogo} />
                    About
                </div>
                <div
                    className={styles.hamItem}
                    onClick={() => {
                        handleCLick("/policy");
                    }}
                >
                    <img src={policyLogo} />
                    Policy
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
