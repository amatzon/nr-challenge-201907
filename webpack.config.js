const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getConfig = () => {
    return {
        entry: [
            path.resolve(__dirname, 'src', 'app', 'index.ts')
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
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
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
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
                template: path.resolve(__dirname, 'public', 'index.html'),
                filename: 'index.html',
                inject: true,
            })
        ]
    };
};

module.exports = () => getConfig();