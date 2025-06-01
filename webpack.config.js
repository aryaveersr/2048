const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const lightningcss = require("lightningcss");
const browserslist = require("browserslist");

module.exports = () =>
  /** @type {import('webpack').Configuration} */ ({
    plugins: [
      new HtmlBundlerPlugin({
        entry: {
          index: "./src/index.html",
        },

        js: {
          filename: "js/[name].js",
        },

        css: {
          filename: "css/[name].css",
        },

        minify: true,
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["css-loader"],
        },
        {
          test: /\.(png|jpe?g|webp|svg)$/,
          type: "asset/resource",
        },
      ],
    },

    optimization: {
      minimizer: [
        new CssMinimizerPlugin({
          minify: CssMinimizerPlugin.lightningCssMinify,

          minimizerOptions: {
            targets: lightningcss.browserslistToTargets(
              browserslist(">= 0.25%")
            ),
          },
        }),
      ],
    },
  });
