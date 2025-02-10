const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  mode: "development",
//   mode: "production",
  //   devtool: "eval-source-map",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
    // new CopyWebpackPlugin({
    //     patterns: [
    //       { from: 'src/img', to: 'dist/img' },
    //     ],
    //   }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
          type: "asset/resource",
          generator: {
            // keep original filenames and copy images to `dist/img/`
            // filename: "[name][ext]",
            filename: d => d.filename.replace(/^src\//, './'),
            // emit: false,
          },
        },
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
    ],
  },
};
