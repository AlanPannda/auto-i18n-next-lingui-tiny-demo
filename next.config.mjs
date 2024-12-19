/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      use: {
        loader: '@lingui/loader'
      }
    })
    return config
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]]
  },
    // 添加重写规则
    async rewrites() {
      return [
        {
          source: '/admin',
          destination: '/admin/index.html',
        },
        {
          source: '/admin/',
          destination: '/admin/index.html',
        },
        {
          source: '/admin/:path*',
          destination: '/admin/:path*',
        },
      ]
    },
  
    // 添加头部配置，处理 CORS
    async headers() {
      return [
        {
          source: '/admin/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, PUT, DELETE, OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'X-Requested-With, Content-Type, Authorization',
            },
          ],
        },
      ]
    },
  
    // 添加静态文件处理配置
    distDir: '.next',
    images: {
      unoptimized: true,
    },
    
    // 确保可以正确处理静态文件
    async redirects() {
      return []
    },
};

export default nextConfig;
