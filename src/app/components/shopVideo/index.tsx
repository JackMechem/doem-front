"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

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
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {isMobile ? (
                <img src={mobileUrl} className={styles.mobileGif} />
            ) : (
                <video loop autoPlay playsInline controls className={styles.video}>
                    <source src={desktopUrl} type="video/mp4" />
                </video>
            )}
        </>
    );
};

export default ShopVideo;
