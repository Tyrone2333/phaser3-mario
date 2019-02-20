let path = require('path')
let webpack = require('webpack')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PROJECT_PATH = process.cwd(); // 项目目录

module.exports = function () {
    return {
        entry: {
            app: [
                path.resolve(__dirname, 'src/index.js')
            ],
            //vendor: ['pixi']

        },
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: './',
            filename: 'js/bundle.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({
                    NODE_ENV: 'production',
                    BASE_URL: '../gameCore.aspx',
                }),
                __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
                WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
                CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
            }),
            new CleanWebpackPlugin(['build']),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            /*new webpack.optimize.UglifyJsPlugin({
              drop_console: true,
              minimize: true,
              output: {
                comments: false
              }
            }),*/
            //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' /* chunkName= */, filename: 'js/vendor.bundle.js' /* filename= */ }),
            new HtmlWebpackPlugin({
                filename: 'index.html', // path.resolve(__dirname, 'build', 'index.html'),
                template: './src/index.html',
                chunks: ['vendor', 'app'],
                chunksSortMode: 'manual',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    html5: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true,
                    removeComments: true,
                    removeEmptyAttributes: true
                },
                hash: true
            }),
            new CopyWebpackPlugin([
                {
                    from: __dirname + '/static',//打包的静态资源目录地址
                    to: './static' //打包到 build 下面的static
                },
                {
                    // 用 `this.load` webpack 打包不会将他的资源引入,所以要复制到 /build 下面
                    from: __dirname + '/resource',
                    to: './resource'
                }
            ]),
            // 不需要在文件名加 hash,HtmlWebpackPlugin 已经会在引入文件的后面加 hash
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],
        module: {
            rules: [
                {
                    // test 表示测试什么文件类型
                    test: /\.css$/,
                    // 使用 'style-loader','css-loader'
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader' // translates CSS into CommonJS
                        }, {
                            loader: 'less-loader' // compiles Less to CSS
                        }]
                },
                {
                    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                    include: [path.join(PROJECT_PATH, './src/'), path.join(PROJECT_PATH, './resource/')],
                    // exclude: [config.VENDORS_PATH],
                    use: [{ // 图片文件小于8k时编译成dataUrl直接嵌入页面，超过8k回退使用file-loader
                        loader: 'url-loader',
                        options: {
                            limit: 19 * 1024, // 8k
                            name: './img/[name].[ext]', // 回退使用file-loader时的名称
                            fallback: 'file-loader', // 当超过8192byte时，会回退使用file-loader
                        }
                    }]
                },
                {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src')},
            ]
        },
        optimization: {
            minimize: true
        }
    }
}
