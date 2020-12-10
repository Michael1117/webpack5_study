const path = require('path');
const FriendlyErrorsWebpackPlugin =require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier');
const icon = path.join(__dirname, 'icon.png')
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin')
const smw = new SpeedMeasureWebpack5Plugin();
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')

module.exports = smw.wrap({
    mode: 'development',        // 配置的模式
    devtool: 'source-map',      // 调试工具的选择
    context: process.cwd(),     // 上下文目录  根目录
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),  // 输出的路径
        filename: '[name].js'       // 输出的文件名
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {bootstrap},
        modules: ["c:/node_modules", 'node_modules'],
        mainFields: ['browser', 'module', 'main'],      // 从package.json中哪个字段查找入口文件
        mainFile: ['index']
    },
    module: {
        rules: [
           {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'less-loader'
                        ]
                    },
                ]
           }
        ]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            onErrors: (severity, errors) => {
                let error = errors[0]
                notifier.notify({
                    title: 'webpack编译失败',
                    message: error.name,
                    subtitle: error.file||'',
                    icon
                })
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',   // 不启动展示打包报告的HTTP服务器
            generateStatsFile: true     // 要生成stats.json文件
        })
    ]
})