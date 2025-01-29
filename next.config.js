/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-international', 'international-types'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        dynamicIO: true,
        ppr: 'incremental',
    },
    reactStrictMode: false,
    // Uncomment to set base path
    // basePath: '/base',
    // Uncomment to use Static Export
    // output: 'export',
    cacheHandler: require.resolve('./cache-handler.js'),
    cacheMaxMemorySize: 0,
};

module.exports = nextConfig;
