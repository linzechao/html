module.exports = function (grunt) {
	'use strict';

	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-htmlmin'); // 压缩html
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // 压缩css
	grunt.loadNpmTasks('grunt-contrib-jshint'); // 检测js语法
	grunt.loadNpmTasks('grunt-contrib-uglify'); // 压缩js
	grunt.loadNpmTasks('grunt-contrib-imagemin'); // 压缩图片
	grunt.loadNpmTasks('grunt-contrib-clean'); // 清除文件(夹)
	grunt.loadNpmTasks('grunt-contrib-watch'); // 文件监听
	grunt.loadNpmTasks('grunt-contrib-copy'); // 复制文件(夹)
	grunt.loadNpmTasks('grunt-contrib-concat'); // 文件合并
	grunt.loadNpmTasks('grunt-contrib-connect'); // 连接服务器
	grunt.loadNpmTasks('grunt-contrib-csslint'); // 连接服务器
	grunt.loadNpmTasks('grunt-autoprefixer'); // 自动加上浏览器支持前缀

	// 项目配置
	grunt.initConfig({
		// 压缩html(暂错)
		htmlmin: {
			options: {
				collapseWhitespace: true, // 删除空行
				removeComments: true, // 删除注释
				minifyCSS: true, // css也压缩
				minifyJS: true, // js也压缩
				collapseBooleanAttributes: true, // 布尔值简写
				useShortDoctype: true, // 使用html5声明文档
				removeScriptTypeAttributes: true, // 删除默认的script的类型
				removeStyleLinkTypeAttributes: true, // 默认样式
				
				processScripts: ['text/template'] // 模板也压缩
			},
			htmlMin: {
				files: {}
			}
		},

		// 压缩css
		cssmin: {
			options: {
				shorthandCompacting: false, // 不简写压缩
				roundingPrecision: -1 // 精确度
			},
			cssMin: {
				files: [{
					expand: true,
					cwd: 'fp/',
					src: ['**/*.css'],
					dest: 'public/',
					ext: '.css',
					extDot: 'frist'
				}]
			}
		},

		// 自动加上浏览器支持前缀
		autoprefixer: {
			'css/main.css': 'css/main.css'
		},

		// 检测js语法
		jshint: {
			options: {
				eqnull: true, // 等于null
				eqeqeq: true, // 使用全等
				undef: true, // 未定义
			   	browser: true, // 运行在浏览器上，location等为全局
				globals: { // 全局对象
					$: true, // 平台模板管理的jq
					define: true, // 使用sea.js的define
					sID: true // 平台模板管理的用户ID
				}
			},
			jsTest: ['js/*.js']
		},

		// 压缩js
		uglify: {
			options: {
				mangle: {
					except: ['require', 'exports', 'module'] // 指定不混搅的变量名
				},
				quoteStyle: 3 // 保留原始引号
			},
			jsMin: {
				files: [{
					expand: true,
					cwd: 'fp/js/',
					src: ['**/*.js'],
					dest: 'public/js',
					ext: '.js',
					extDot: 'first'
				}]
			}
		},

		// 压缩图片
		imagemin: {
			options: {
				optimizationLevel: 2 // 压缩水平
			},
			imgMin: {
				files: [{
					expand: true,
					cwd: 'fp/img/',
					src: ['**/*.{png,jpg,gif,ico}'],
					dest: 'public/img/'
				}]
			}
		},

		// 清除文件(夹)
		clean: ['public/**'], // 清除public下的所有清除文件(夹)

		// 文件合并
		concat: {
			options: {
				separator: ';' // 使用分号来做连接符
			},
			merge: {
				src: 'fp/js/**/*.js',
				dest: 'public/main.js'
			}
		},

		// 验证css语法
		csslint: {
			options: {},
			cssTest: ['public/css/**/*.css']
		},

		// 复制文件(夹)
		copy: {
			ctrl_c: {
				files: [{
					'app/public/bootstrap/js/bootstrap.js': 'bower_components/bootstrap/dist/js/bootstrap.min.js',
					'app/public/bootstrap/css/bootstrap.css': 'bower_components/bootstrap/dist/css/bootstrap.min.css',
					'app/public/zepto.js': 'bower_components/zepto/zepto.min.js',
					'app/public/touch.js': 'bower_components/Touch/touch.js',
				}, {
					expand: true,
					cwd: 'bower_components/bootstrap/dist/fonts/',
					src: ['*'],
					dest: 'app/public/bootstrap/fonts/'
				}]
			}
		},

		// 文件监听
		watch: {
			watchServer: { // 监听服务器
				options: {
					livereload: '<%= connect.options.livereload %>' // 与connect的端口一直
				},
				files: [ // 刷新指定文件
					'app/*.html',
					'app/js/*.js',
					'app/css/*.css',
					'app/img/*.{png,jpg,gif,ico}'
				]
			}
		},

		// 连接服务器
		// 需要与watch配合后同时启动
		connect: {
			options: {
				port: 4004,
				hostname: '*', //默认
				livereload: 35729
			},
			server: {
				options: {
					open: true, // 自动打开
					base: ['app'] // 主目录
				}
			}
		}
	});

	// 默认任务
	grunt.registerTask('default', ['connect', 'watch']);
};
