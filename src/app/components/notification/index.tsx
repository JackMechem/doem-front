import { ReactNode } from "react";
import styles from "./page.module.css";
import { AnimatePresence, motion } from "framer-motion";

const Notification = ({ children }: { children: ReactNode }) => {
    return <div className={styles.notification}>{children}</div>;
};

export default Notification;
