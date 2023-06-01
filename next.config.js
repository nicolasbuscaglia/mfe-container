/** @type {import('next').NextConfig} */

const NextFederationPlugin = require("@module-federation/nextjs-mf");
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    mfeApp1: `mfeApp1@${process.env.NEXT_PUBLIC_MFE_APP_1}/_next/static/${location}/remoteEntry.js`,
    mfeApp2: `mfeApp2@${process.env.NEXT_PUBLIC_MFE_APP_2}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "mfeContainer",
        filename: "static/chunks/remoteEntry.js",
        remotes: remotes(options.isServer),
        shared: {},
      })
    );
    return config;
  },
};

module.exports = nextConfig;
