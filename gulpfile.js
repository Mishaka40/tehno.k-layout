const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const uncss = require('gulp-uncss')

function html(){
	return src('src/**.html')
	.pipe(include({
		prefix: '@@'
	}))
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(dest('dist'))
}

function html_serv(){
	return src('src/services/**.html')
		.pipe(include({
			prefix: '@@'
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('dist/services'))
}

function html_news(){
	return src('src/news/**.html')
		.pipe(include({
			prefix: '@@'
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('dist/news'))
}
/*
function html_forms(){
	return src('src/forms/**.html')
		.pipe(include({
			prefix: '@@'
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('dist/forms'))
}*/

function css(){
	return src('src/css/**.css')
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions'],
			browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			]
		}))
		.pipe(csso())
		.pipe(concat('index.css'))
		.pipe(dest('dist/css'))
}

function js(){
	return src('src/js/**.js')
		.pipe(concat('index.js'))
		.pipe(dest('dist/js'))
}

function img(){
	return src('src/img/**')
		.pipe(dest('dist/img'))
}

function fonts(){
	return src('src/fonts/**')
		.pipe(dest('dist/fonts'))
}

function clear(){
	return del('dist')
}

function serve(){
	sync.init({
		server: {
			baseDir: "./dist"
		}
	})
	watch('src/**.html', series(html)).on('change', sync.reload)
	watch('src/parts/**.html', series(html)).on('change', sync.reload)
	watch('src/css/**.css', series(css)).on('change', sync.reload)
	watch('src/news/**.html', series(html)).on('change', sync.reload)
	watch('src/services/**.html', series(html)).on('change', sync.reload)
	watch('src/js/**.js', series(js)).on('change', sync.reload)
	watch('src/home_sections/**.html', series(html)).on('change', sync.reload)

}

function del_css (){
	return src('src/css/main.css')
        .pipe(uncss({
            html: ['src/**.html', 'src/**/*.html']
        }))
        .pipe(dest('dist/out'));
}

exports.build = series(clear, css, html, html_serv, html_news, js, img, fonts)
exports.serve = series(clear, css, html, html_serv, html_news, js, img, fonts, serve)
exports.clear = clear