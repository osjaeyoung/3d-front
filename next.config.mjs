/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["via.placeholder.com"],
  },
  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination:
          process.env.NEXT_PUBLIC_RUNNING_ENV === "development"
            ? "http://3.38.72.210:3000/:path*"
            : "http://3.38.72.210:4000/:path*",
      },
    ];
  },
};

export default nextConfig;
