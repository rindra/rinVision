 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
   entry: './release/js/app.js',
   output: {
     path: path.resolve(__dirname + '/release', 'castlight/www'),
     filename: 'all.js'
   },
   module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /(node_modules|bower_components)/,
         loader: "babel-loader",
         query: {
           presets: ['env'],
           //compact: true
         }
       }
     ]
   },
   stats: {
     colors: true
   },
   mode: 'production',
   performance: { hints: false },
   devtool: 'source-map'
 };
