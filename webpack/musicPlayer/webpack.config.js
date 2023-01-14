const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
//打包文件分析
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development', //开发者模式,production生产者模式
	devtool: 'source-map', //源码调试
	//入口
	entry: {
		index: './src/js/index.js',
	},
	//出口
	output: {
		filename: "scripts/[name].js",
		publicPath:'http://localhost:8080/',
		path:path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /.css$/,
				use: [
				    //MiniCssExtractPlugin.loader,
				    'style-loader',
				    'css-loader'
				    //'css-loader?modules', //cssmodule
				    
				]
			},
			{
				test: /.less$/,
				use: [
				    MiniCssExtractPlugin.loader,
					//'css-loader?modules',
					'css-loader',
					'less-loader',
				],
			},
			{
				test: /.(png|jpg|jpeg)$/,
				use: [{
					loader: 'file-loader',
					options: {
						limit: 3000,
						name: 'img/[name].[ext]',
					}
				}]
			},
			{
				test: /.html$/,
				loader:'html-withimg-loader'
			}
		]
	},
	//插件
	plugins:[
	    //清除目录
        new CleanWebpackPlugin({
        	cleanOnceBeforeBuildPatterns:["**/*",'!mock','!mock/*',"!source","!source/*"]
        }),
        //生成页面
        new HtmlWebpackPlugin({
            template:'./src/html/index.html', //页面模板
            filename: 'html/index.html', //生成页面
            chunks: ['index']
        }),
        //css独立打包
        new MiniCssExtractPlugin({
        	filename:'css/[name].css',
        	chunkFilename: 'css/[id].css'
		}),
        new webpack.ProvidePlugin({
		  $: 'jquery',
		  z: 'zepto-webpack'
		}),
		
		//打包文件分析
		/*new WebpackBundleAnalyzer({
            analyzerMode: 'server',
            //  将在“服务器”模式下使用的主机启动HTTP服务器。
            analyzerHost: '127.0.0.1',
            //  将在“服务器”模式下使用的端口启动HTTP服务器。
            analyzerPort: 8888, 
            //  路径捆绑，将在`static`模式下生成的报告文件。
            //  相对于捆绑输出目录。
            logLevel: 'info' 
            // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
        })*/
    ],
    //开发服务器
    devServer: {
    	contentBase: './dist',
    	open: true,
    	openPage: 'html/index.html',
    	hot:true //开启热替换
    },
    stats: {
    	modules: false,
    	colors: true,
    	chunks:false
    },
    //压缩代码
    optimization: {
		//是否要启用压缩，默认情况下，生产环境会自动开启
		//minimize:true
		minimizer:[
			//压缩时使用的插件，可以有多个
			new TerserPlugin(),
			new OptimizeCSSAssetsPlugin()
		]
    }
}