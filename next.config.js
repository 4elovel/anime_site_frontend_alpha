/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.myanimelist.net",
            },
        ],
        domains: ['images.unsplash.com', ],
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg")
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: ["@svgr/webpack"],
            }
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

module.exports = nextConfig;
