const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  //loader配置
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    //plugins配置
    new HtmlWebpackPlugin({
      //以 './src/index.html' 为模板html，自动引入打包资源
      template: './src/index.html'
    })
  ],
  //模式
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    //gzip
    compress: true,
    port: 3000,
    //自动打开浏览器
    open: true
  }
}