const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getConfig = () => {
    return {
        entry: [
            path.resolve(__dirname, 'src', 'app', 'index.ts')
        ],
        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/',
            filename: '[name].[hash].js',
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: 'public',
            watchContentBase: true,
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        'css-loader',
                        // 'style-loader',
                        'sass-loader',
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                filename: 'index.html',
                inject: true,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
            }),
        ]
    };
};

module.exports = () => getConfig();