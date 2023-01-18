/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  webpack(config) {
    // The following alias configurations will allow devs to not worry about the relative path scoping
    config.resolve.alias["features"] = path.join(__dirname, "src", "features");
    // Preload BlenderPro
    config.module.rules.push({
      test: /BlenderPro-Bold\.woff$/,
      use: {
        loader: "file-loader",
        options: {
          outputPath: "static/fonts/",
          publicPath: "/_next/static/fonts/",
          limit: 1,
        },
      },
    });
    return config;
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // Note: This experimental feature is required to use NextJS Image in SSG mode.
  // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
  images: {
    unoptimized: true,
  },
};
