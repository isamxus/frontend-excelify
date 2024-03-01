const path = require("path");
// 定义公共配置
const commonConfig = {
  mode: "production",
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  externals: {
    exceljs: "exceljs",
  },
};

// 定义UMD配置
const umdConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "frontend-excelify.umd.js",
    library: {
      name: "frontend-excelify",
      type: "umd",
    },
  },
};

// 定义ES6模块配置
const esmConfig = {
  ...commonConfig,
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "frontend-excelify.esm.js",
    library: {
      type: "module",
    },
  },
};

module.exports = [umdConfig, esmConfig];
