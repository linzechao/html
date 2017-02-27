module.exports = function (grunt) {
	'use strict';

	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-htmlmin'); // 压缩html
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // 压缩css
	grunt.loadNpmTasks('grunt-contrib-jshint'); // 检测js语法
	grunt.loadNpmTasks('grunt-contrib-uglify'); // 压缩js
	grunt.loadNpmTasks('grunt-contrib-clean'); // 清除文件(夹)
	grunt.loadNpmTasks('grunt-contrib-watch'); // 文件监听
	grunt.loadNpmTasks('grunt-contrib-copy'); // 复制文件(夹)
	grunt.loadNpmTasks('grunt-contrib-concat'); // 文件合并
	grunt.loadNpmTasks('grunt-contrib-connect'); // 连接服务器
	grunt.loadNpmTasks('grunt-autoprefixer'); // 自动加上浏览器支持前缀

	// 项目配置
	grunt.initConfig({
		// 文件合并
		concat: {
			go: {
				files: [{
					'public/index.html': ['src/pages/header.html', 'src/index.html', 'src/pages/footer.html', 'src/pages/js/index.html'],
					'public/login.html': ['src/pages/header.html', 'src/login.html', 'src/pages/footer.html', 'src/pages/js/login.html'],
					'public/register.html': ['src/pages/header.html', 'src/register.html', 'src/pages/footer.html', 'src/pages/js/register.html']
				}]
			}
		},

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
			go: {
				files: {
					'public/index.html': 'public/index.html',
					'public/login.html': 'public/login.html',
					'public/register.html': 'public/register.html'
				}
			}
		},

		// 复制文件(夹)
		copy: {
			go: {
				files: [{
					'public/img/favicon.ico': 'src/img/favicon.ico',
					'public/css/main.css': 'src/css/main.css'
				}, {
					expand: true,
					cwd: 'src/lib/',
					src: ['**/*.php'],
					dest: 'public/lib/',
					ext: '.php',
					extDot: 'frist'
				}]
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
					cwd: 'public/css/',
					src: ['**/*.css'],
					dest: 'public/css/',
					ext: '.css',
					extDot: 'frist'
				}]
			}
		},

		// 连接服务器
		// 需要与watch配合后同时启动
		connect: {
			options: {
				port: 8090,
				hostname: '*', //默认
				livereload: 35729
			},
			server: {
				options: {
					open: true, // 自动打开
					base: ['public'] // 主目录
				}
			}
		},


		// 文件监听
		watch: {
			// 监听服务器
			watchServer: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				// 刷新指定文件
				files: [
					'src/**/*.html',
					'src/js/*.js',
					'src/css/*.css',
					'src/img/*.{png,jpg,gif,ico}',
					// 后端
					'src/lib/*.php',
					// 后台与配置
					'Gruntfile.js'
				],
				
				// 同时执行发布任务
				tasks: ['concat', 'htmlmin', 'copy', 'cssmin']
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

		// 清除文件(夹)
		// 清除public下的所有清除文件(夹)
		clean: ['public/**']
	});

	// 使用Chrome LiveReload浏览器插件
	grunt.registerTask('default', ['connect', 'watch']);

	// 发布
	grunt.registerTask('go', ['concat', 'htmlmin', 'copy', 'cssmin']);
};
