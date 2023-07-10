"use client";

import { AnimatePresence, motion } from "framer-motion";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <AnimatePresence initial={true} mode="sync">
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", duration: 0.4 }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
);
