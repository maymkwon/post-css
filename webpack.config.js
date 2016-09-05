// webpack.config.js
var precss       = require('precss');
var path = require('path');
var webpack       = require('webpack');
var modernizr       = require('modernizr');
var autoprefixer = require('autoprefixer');
var lost = require('lost');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postcssNext = require("postcss-cssnext");
var postcssImport = require("postcss-import");
var postcssUrl = require("postcss-url");


module.exports = {
entry: './entry.js',
output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
},
watch:true,
devserver:{
    hot:true,
    inline:true,
    contentBase:__dirname
},
resolve: {
      modulesDirectories: ["node_modules", "bower_components"],
      alias: {
        modernizr$: path.resolve(__dirname, "./.modernizrrc")
      }
  },
plugins: [
      new ExtractTextPlugin("styles.css")
],
  module: {
        loaders: [
            {
                test:   /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "css!postcss-loader?sourceMap=inline"
                )
            },
            {
                test: /\.modernizrrc$/,
                loader: "modernizr"
            },
        ]
    },
    postcss: function () {
        return [
            precss,
            autoprefixer({ browsers: ['last 2 versions']}),
            lost,
            postcssImport({addDependencyTo: ['webpack']}),
            postcssUrl,
            // postcssNext
        ];
    }

};
