const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, './src/js/index.js')
    }, 
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
        clean: true,
        assetModuleFilename: 'assets/[name][ext]'
    },
    devtool: 'source-map',
    devServer: {
        //This option allows configuring options for serving static files from the directory 
        static : {
            directory: path.resolve(__dirname, 'dist')
        },
        // Tells clients connected to devServer to use the provided port.
        port:8080,
        //Tells dev-server to open the browser after server had been started
        open: true,
        //Replacement without page refresh
        hot: true,
        //Enable gzip compression for everything served
        compress: true,
        //When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Webpack app',
            template: path.resolve(__dirname, './src/index.html')
        })
    ],
    module: {
        rules : [
            {
                //SCSS LOADER
                test: /\.scss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader", 
                    // Translates CSS into CommonJS
                    "css-loader", 
                    //resoud les erreurs de chemin des fichiers font-awesome ici
                    'resolve-url-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            },
            {
                //JS LOADER
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                //IMAGE LOADER
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i, //i pour case insensitive
                type: 'asset/resource'
            },
            {
                //HTML LOADER
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            }
        ]
    }
}