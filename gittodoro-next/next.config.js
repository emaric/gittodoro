/** @type {import('next').NextConfig} */

const WorkerPlugin = require('worker-plugin')

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false
    config.plugins.push(
      new WorkerPlugin({
        globalObject: 'self',
      })
    )
    return config
  },
}

module.exports = nextConfig
