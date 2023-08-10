"use client";

import styles from "./page.module.css";
import { useState, useEffect, Suspense } from "react";
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
                <Suspense
                    fallback={
                        <div style={{ height: "100%", width: "100%", backgroundColor: "red" }}>
                            loading...
                        </div>
                    }
                >
                    <video loop autoPlay playsInline muted className={styles.video}>
                        <source src={desktopUrl} type="video/mp4" />
                    </video>
                </Suspense>
            )}
        </>
    );
};

export default ShopVideo;
