/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.swell.store",
                port: "",
                pathname: "/doem/**",
            },
            {
                protocol: "https",
                hostname: "media.graphassets.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
