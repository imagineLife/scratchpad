const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    //where to put the output, in the build dir
    path: path.resolve(__dirname, 'dist'),
    //  https://webpack.js.org/configuration/output/#outputpublicpath
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
              presets: ['@babel/react', '@babel/env']
          }
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          /*
            style-loader
            adds the css script tag in the browers
            consumes the css-loader arr
          */ 
          "style-loader", 
          /*
            css-loader TRANSFORMS the css to a js obj,
            as seen through footerJS
            import css from "./footer.css";
            console.log('css')
            console.log(css)
            
            [
              [
                "./src/footer.css",
                "footer {\n    height: 100px;\n    width: 100%;\n    background: yellowgreen;\n    border: 1px solid black;\n}",
                ""
              ]
            ]
          */
          "css-loader"
        ]
        // use: [MiniCss.loader, "css-loader"]
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/,
        use: [
          { 
            loader: 'file-loader', 
            options: {},
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    //shows webpack build process during build
    // as terminal output
    new webpack.ProgressPlugin(),
    new MiniCss({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyPlugin([
      //data file
      { 
        from: path.resolve(__dirname, 'data'),
        to: path.resolve(__dirname, 'dist/data') 
      }
    ]),
    /**
         * CleanWebpackPlugin:
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/build/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
    new CleanWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    port:8081
  }
};