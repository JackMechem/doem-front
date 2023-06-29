import { ReactNode, useEffect, useState } from "react";

const Hydration = ({ children }: { children: ReactNode }) => {
    const [isHydrated, setIsHydrated] = useState(false);

    // Wait till Next.js rehydration completes
    useEffect(() => {
        setIsHydrated(true);
    }, [isHydrated]);

    return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default Hydration;
