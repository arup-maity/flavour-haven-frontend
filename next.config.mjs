/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "bucket.ovh.arupmaity.in"
          },
         {
            protocol: "https",
            hostname: "f005.backblazeb2.com"
          },
      ],
   }
};

export default nextConfig;
