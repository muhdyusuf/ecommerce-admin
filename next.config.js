/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'ylyejdywgahqmkybovya.supabase.co',
              port: '',
              pathname: '/storage/v1/object/public/images/**',
            },
          ],
    },
    async headers() {
      return [
        {
          source: "/api/checkout",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "Content-Type,Authorization" },
          ]
        }
      ]
    }
}

module.exports = nextConfig
