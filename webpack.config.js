const path = require('path');
const webpack = require('webpack');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'app', 'index.js');

const config = {
    devtool: "source-map",
    stats: {
    	errorDetails: true
    },
    resolve: {
        modules: [
            path.resolve('./node_modules')
        ]
    },
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',  // this keeps erroring not sure what it is
        mainPath
    ],
    output: {
        path: buildPath,
        publicPath: '/build/',
        filename: 'bundle.js',
        libraryTarget: "var",
        library: 'sextant', // the name of the library we refer to
        sourcePrefix: '' // required for cesium
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ContextReplacementPlugin(
        		  /\w*\/config.js/,
        		  path.resolve(__dirname, './config/config.js'),
        		)
//        new webpack.ProvidePlugin({
//           $: "jquery",
//           jQuery: "jquery"
//       })
    ],

    module: {
        noParse: [
            /.pako_inflate.js/ //this module seems to cause some warning apparently
        ],
        unknownContextCritical : false,
        loaders: [
            {test: /\.json$/, loader: "json-loader"},
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [nodeModulesPath],
                query: {
                    plugins: ['transform-runtime'], //Don't know why needed, but recommended
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {test: /\.js$/, loader: 'babel', exclude: [nodeModulesPath]},
            {test: /\.css$/, loader: "style!css" },
            {test: /\.(png|gif|jpg|jpeg|glsl)$/, loader: "file-loader"},
            {test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=10000' },
            {test: /node_modules/, loader: 'ify'}
        ]
    },
    node: {
    	__dirname: true,
        fs: "empty" //bug fix for cannot resolve module fs error
    }
};

module.exports = config;