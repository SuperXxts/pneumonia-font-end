const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry:path.join(__dirname,'src/main.js'),//配置文件入口,表示要使用webpack 要打包那个文件
    
	output:{
		//输出文件配置
		path:path.join(__dirname,'dist'),
		filename:'bundle.js'//指定输出文件的名称
	},
	 plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
               
            },
       
		{ test:/\.css$/,use:['style-loader','css-loader']},//配置处理 .css文件的第三方loader规则
		{ test:/\.(jpg|png|gif|bmp|jpeg|eot|woff2|woff|ttf|svg)$/, use: 'url-loader'},
		{ test: /\.styl$/,
			use: [
			"stylus-loader"
			],
		}
]
	},
}