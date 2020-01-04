const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const config = {
	entry: {
		main: './src/app.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		index: 'index.html',
		port: 3000
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.pug'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Popper: ['popper.js', 'default'],
			JSZip: 'jszip'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css',
		}),
		new CleanWebpackPlugin(),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'jquery': 'jquery/dist/jquery.slim.min.js',
			'pptxgenjs': 'pptxgenjs/dist/pptxgen.min.js',
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.pug$/,
				use: 'pug-loader'
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					// Interprets `@import` and `url()` like `import/require()` and will resolve them
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					},
					// Loads a SASS/SCSS file and compiles it to CSS
					{loader: 'sass-loader'},
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
			}),
		],
		runtimeChunk: 'multiple',
		// splitChunks: {
		// 	chunks: 'async',
		// 	minSize: 30000,
		// 	maxSize: 0,
		// 	minChunks: 1,
		// 	maxAsyncRequests: 6,
		// 	maxInitialRequests: 4,
		// 	automaticNameDelimiter: '~',
		// 	automaticNameMaxLength: 30,
		// 	cacheGroups: {
		// 		vendors: {
		// 			test: /[\\/]node_modules[\\/]/,
		// 			priority: -10
		// 		},
		// 		default: {
		// 			minChunks: 2,
		// 			priority: -20,
		// 			reuseExistingChunk: true
		// 		}
		// 	}
		// },
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					enforce: true,
				},
			},
		},
	},
};


module.exports = function (env, argv) {
	if (argv.mode === 'development') {
	}
	if (argv.mode === 'production') {
	}
	return config;
};