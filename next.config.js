const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"
    }
}

const withPWA = require("@ducanh2912/next-pwa").default({
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    dest: "public",
    fallbacks: {
        document: "/offline"
    },
    workboxOptions: {
        disableDevLogs: true
    }
});

module.exports = withPWA(nextConfig);
