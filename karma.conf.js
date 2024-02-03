const path = require("path");

// karma.conf.js
module.exports = function (config) {
  config.set({
    singleRun: true,
    frameworks: ["mocha", "chai", "webpack"],
    files: [
      // 所有的测试文件的路径
      "tests/**/*.spec.ts",
    ],
    preprocessors: {
      // 指定测试文件需要经过webpack和sourcemap处理
      "tests/**/*.spec.ts": ["webpack", "coverage"],
      "src/**/*.ts": ["webpack", "coverage"],
    },
    coverageIstanbulReporter: {
      dir: path.join(__dirname, "coverage"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
      "report-config": {
        html: {
          // 输出到 ./coverage/html
          subdir: "html",
        },
      },
    },
    webpack: {
      // webpack配置
      mode: "development",
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: ["istanbul"],
              },
            },
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                  plugins: ["istanbul"],
                },
              },
              {
                loader: "ts-loader",
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                  transpileOnly: true,
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: [".ts", ".js", ".vue", ".json"],
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
      },
    },
    reporters: ["progress", "coverage-istanbul"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    concurrency: Infinity,
  });
};
