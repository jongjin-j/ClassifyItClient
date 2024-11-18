/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: "https://classifyitserver.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
