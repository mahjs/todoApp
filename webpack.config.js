const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path:path.resolve(__dirname, 'output'),
        filename: 'bundle.js' 
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_module/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo App',
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}