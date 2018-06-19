const path = require('path');
const webpack = require('webpack');

// 简化HTML文件的创建，可以将入口文件放入script标签中，并放入body元素中
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。
// 因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    
    entry: './src/app.jsx',
    
    output: {
        // 打包到的位置, /dist
        path: path.resolve(__dirname, 'dist'),
        // localhost:8080/dist/...
        publicPath: '/dist/',
        filename: 'app.js',
    },

    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component')
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                    }
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    // loader（例如 'style-loader'）应用于当 CSS 没有被提取
                    fallback: 'style-loader',
                    // loader 被用于将资源转换成一个 CSS 导出模块 
                    use: 'css-loader'
                })
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 文件大于8k才单独形成一个文件
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            //favicon: './favicon.ico'
        }),
        // 打包出独立css文件，新css文件名作为参数
        new ExtractTextPlugin("css/[name].css"),
        
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    
    devServer: {
        port: 8086,
        // 访问路径时若无法找到，返回指定也main
        historyApiFallback: {
            index: '/dist/index.html'
        }
    }
}