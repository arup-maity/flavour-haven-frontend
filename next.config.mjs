/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "bucket.ovh.arupmaity.in"
          },
      ],
   }
};

export default nextConfig;
