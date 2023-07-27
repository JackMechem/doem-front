"use client";

import { NextPage } from "next";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { RxCross1 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    logoUrl: string;
    companyDescription: string;
    aboutLogo: string;
    shopLogo: string;
    policyLogo: string;
    closeStateChanger: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu: NextPage<Props> = ({
    logoUrl,
    companyDescription,
    aboutLogo,
    shopLogo,
    policyLogo,
    closeStateChanger,
}) => {
    const router = useRouter();

    const handleCLick = (href: string) => {
        router.push(href);
    };

    return (
        <div className={styles.hamMenu}>
            <AnimatePresence initial={true}>
                <motion.img
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={styles.hamImg}
                    src={logoUrl}
                    onClick={() => {
                        handleCLick("/");
                    }}
                />
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={styles.hamItemContainer}
                >
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
                </motion.div>
                <motion.div
                    className={styles.close}
                    onClick={() => {
                        closeStateChanger((c) => !c);
                    }}
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 360, opacity: 1 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 50 }}
                >
                    <RxCross1 />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MobileMenu;
