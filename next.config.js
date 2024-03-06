/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // <=== enables static exports
  basePath: "/dota_fantasy_github",
  // images: {
  //   loader: "imgix",
  //   path: "/",
  // },
  // exportTrailingSlash: true, // comment this out when yarn build and yarn next export
};

module.exports = nextConfig;
