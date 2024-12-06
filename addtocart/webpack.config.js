const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');
//const { default: placeAddToCart } = require("./src/placeAddToCart.jsx");

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3003/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3003,
    hot: true, // Enable hot reloading
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    onListening: function (devServer) {
      const port = devServer.server.address().port
      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    },
  },

  devtool: argv.mode === 'development' ? 'source-map' : false,

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ]
          }
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "addtocart",
      filename: "remoteEntry.js",
      remotes: {
        pdp: "pdp@http://localhost:3001/remoteEntry.js",
        home: "home@http://localhost:3000/remoteEntry.js",
        cart: "cart@http://localhost:3002/remoteEntry.js",
        addtocart: "addtocart@http://localhost:3003/remoteEntry.js",
      },
      exposes: {
        "./AddToCart": "./src/AddToCart",

      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps.react,
        },
        "react-router-dom": {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps["react-router-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
