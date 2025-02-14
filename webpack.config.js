const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const { name } = require("file-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
};

module.exports = {
  mode: "development",
  //   mode: "production",
  //   devtool: "eval-source-map",
  devtool: "source-map",
  entry: {
    app: `${PATHS.src}/js/index.js`,
  },
  output: {
    filename: "[name].bundle.js",
    path: PATHS.dist,
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          enforce: true, //Отделяет отдельно CSS
        },
      },
    },
    minimizer: [
      "...", //Чтобы подключались стандартные минимизаторы
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
      }),
    ],
  },
  devServer: {
    port: 8081,
    watchFiles: [`${PATHS.src}//**/*.html`],
    client: {
      overlay: true,
    },
    open: {
      app: {
        name: "chrome",
      },
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `html-loader!webpack-html-include-loader!${PATHS.src}/index.html`,
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: `${PATHS.src}/data`, to: `${PATHS.dist}/data` }],
    }),
  ],
  resolve: {
    alias: {
      css: `${PATHS.src}/css`,
      img: `${PATHS.src}/img`,
      font: `${PATHS.src}/font`,
      js: `${PATHS.src}/js`,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // {
      //   test: /\.html$/i,
      //   use: "html-loader",
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
        type: "asset/resource",
        generator: {
          // keep original filenames and copy images to `dist/img/`
          // filename: "[name][ext]",
          filename: (d) =>
            d.filename.replace(/^src[\\/]/, "./").replaceAll("\\", "/"),
        },
      },
      //   {
      //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //     loader: ImageMinimizerPlugin.loader,
      //     enforce: "pre",
      //     options: {
      //       minimizer: {
      //         implementation: ImageMinimizerPlugin.imageminMinify,
      //         options: {
      //           plugins: [
      //             "imagemin-gifsicle",
      //             "imagemin-mozjpeg",
      //             "imagemin-pngquant",
      //             "imagemin-svgo",
      //           ],
      //         },
      //       },
      //     },
      //   },
      //   {
      //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //     use: [
      //       {
      //         loader: "file-loader",
      //         options: {
      //           name: "[name].[ext]",
      //         },
      //       },
      //     ],
      //   },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
