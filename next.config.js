/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    loader: "akamai",
    path: "",
  },
  assetPrefix: "./",
  // exportTrailingSlash: true, // comment this out when yarn build and yarn next export
};

module.exports = nextConfig;
