var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    devtool: 'source-map',
    entry: {
        Wxs3Map: './src/index.js'
    },
    externals: {
        underscore: '_',
        'proj4/lib/index': 'proj4',
        three: 'THREE',
        'three.trackball': 'TrackballControls'
    },
    output: {
        path: path.join(__dirname, 'build'),
        library: 'Wxs3Map',
        filename: 'Wxs3Map.min.js',
        libraryTarget: 'var'

    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    plugins: [
        new UglifyJsPlugin({minimize: true})
    ]
};
