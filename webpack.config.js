const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/assets/js/app.js',
    home: './src/assets/js/home.js',
    product: './src/assets/js/product.js',
    cart: './src/assets/js/cart.js',
    search: './src/assets/js/search.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
}
