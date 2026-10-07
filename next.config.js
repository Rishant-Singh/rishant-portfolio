/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "avatars.githubusercontent.com" },
            { protocol: "https", hostname: "raw.githubusercontent.com" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "res.cloudinary.com" },
        ],
        // Enable modern image formats for better performance
        formats: ["image/avif", "image/webp"],
    },

    // Next.js 15: moved from experimental.serverComponentsExternalPackages
    serverExternalPackages: ["mongoose"],

    // Allow markdown editor bundle
    transpilePackages: ["@uiw/react-md-editor"],

    // Compress responses
    compress: true,

    // Strict mode for React best practices
    reactStrictMode: true,

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-XSS-Protection", value: "1; mode=block" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                ],
            },
        ];
    },

    async redirects() {
        return [
            // Redirect trailing slashes for clean URLs
            {
                source: "/:path+/",
                destination: "/:path+",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;

