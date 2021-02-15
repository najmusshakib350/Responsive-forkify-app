const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
module.exports={
    entry:['@babel/polyfill','./src/js/controller/index.js'],
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'bundle.js'
    },
    devServer:{
        contentBase:'./dist'
    },
    plugins:[
        new HtmlWebpackPlugin ({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin()
    ],

    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                      }
                }
             },
             {
                 test: /\.css$/i,
                 use: [MiniCssExtractPlugin.loader, 'css-loader'],
               }
        ]
    }
      
};

//"@babel/core": "^7.12.3",