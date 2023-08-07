"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
    desktopUrl: string;
    mobileUrl: string;
}

const ShopVideo = ({ desktopUrl, mobileUrl }: Props) => {
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = () => {
        if (window.innerWidth < 900) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {isMobile ? (
                <Image
                    alt="mobile category video"
                    width={0}
                    height={0}
                    src={mobileUrl}
                    className={styles.mobileGif}
                />
            ) : (
                <video loop autoPlay playsInline muted className={styles.video}>
                    <source src={desktopUrl} type="video/mp4" />
                </video>
            )}
        </>
    );
};

export default ShopVideo;
