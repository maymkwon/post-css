// webpack.config.js
var precss       = require('precss');
var webpack       = require('webpack');
var autoprefixer = require('autoprefixer');
var lost = require('lost');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postcssNext = require("postcss-cssnext");
var postcssImport = require("postcss-import");
var postcssUrl = require("postcss-url");
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  watch:true,
  resolve: {
        modulesDirectories: ["node_modules", "bower_components"]
    },
  plugins: [
      new ExtractTextPlugin("styles.css"),
      new webpack.ResolverPlugin(
           new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
       )
  ],
  module: {
        loaders: [
            {
                test:   /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "css!postcss-loader?sourceMap=inline"
                )
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
