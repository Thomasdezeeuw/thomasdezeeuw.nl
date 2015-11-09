var gulp = require('gulp')
	, concat = require('gulp-concat')
	, runSequence = require('run-sequence')

	// Building script.
	, uglify = require('gulp-uglify')

	// Minifying HTML
	, htmlmin = require('gulp-htmlmin')

	// Building style.
	, prefix = require('gulp-autoprefixer')
	, uncss = require('gulp-uncss')
	, cleancss = require('gulp-minify-css')

	// Clean.
	, rimraf = require('gulp-rimraf')

	// Gzip
	, gzip = require('gulp-gzip')

var paths = {
	src: {
		style: [
			'./themes/cactus/static/css/normalize.css',
			'./static/css/highlight.css',
			'./themes/cactus/static/css/main.css'
		],
		script: [
			'./static/js/highlight.js',
			'./static/js/main.js'
		],
		html: ['./public/**/*.html'],
		gzip: [
			'./public/**/*.html',
			'./public/**/*.xml',
			'./public/**/*.js',
			'./public/**/*.css',
		]
	},
	remove: {
		script: [
			'./public/js/**/*.js',
			'!./public/js/script.js'
		],
		style: [
			'./public/css/**/*.css',
			'!./public/css/style.css'
		],
		other: [
			'./public/page',
			'./public/post',
			'./public/go/page',
			'./public/go/index.html',
			'./public/**/*.xml'
		]
	},
	dst: {
		style: './public/css/',
		script: './public/js/'
	}
}

gulp.task('default', function(callback) {
  runSequence('build', 'clean', 'gzip', callback);
});

gulp.task('build', ['build-script', 'minify-html', 'build-style'])

gulp.task('build-script', function () {
	return gulp.src(paths.src.script)
		.pipe(concat('script.js'))
    .pipe(uglify({
			compress: {
				sequences     : true,  // Join consecutive statemets with the “comma operator”.
				properties    : true,  // Optimize property access: a["foo"] → a.foo.
				dead_code     : true,  // Discard unreachable code.
				drop_debugger : true,  // Discard “debugger” statements.
				unsafe        : true,  // Some unsafe optimizations (see below).
				conditionals  : true,  // Optimize if-s and conditional expressions.
				comparisons   : true,  // Optimize comparisons.
				evaluate      : true,  // Evaluate constant expressions.
				booleans      : true,  // Optimize boolean expressions.
				loops         : true,  // Optimize loops.
				unused        : true,  // Drop unused variables/functions.
				hoist_funs    : true,  // Hoist function declarations.
				hoist_vars    : true,  // Hoist variable declarations.
				if_return     : true,  // Optimize if-s followed by return/continue.
				join_vars     : true,  // Join var declarations.
				cascade       : true,  // Try to cascade `right` into `left` in sequences.
				side_effects  : true,  // Drop side-effect-free statements.
				warnings      : true,  // Warn about potentially dangerous optimizations/code.
			}
		}))
		.pipe(gulp.dest(paths.dst.script))
})

gulp.task('minify-html', function() {
	return gulp.src(paths.src.html)
		.pipe(htmlmin({
			removeComments: true,
			removeCommentsFromCDATA: true,
			removeCDATASectionsFromCDATA: true,
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeRedundantAttributes: true,
			preventAttributesEscaping: true,
			useShortDoctype: true
		}))
		.pipe(gulp.dest('./public'))
})

gulp.task('build-style', function () {
	return gulp.src(paths.src.style)
		.pipe(concat('style.css'))
		.pipe(prefix())
	/*
		Crashes, see: https://github.com/giakki/uncss/issues/201.
		.pipe(uncss({
			html: paths.html
		}))
	*/
		.pipe(cleancss({
			keepSpecialComments: 0
		}))
		.pipe(gulp.dest(paths.dst.style))
})

gulp.task('clean', ['clean-script', 'clean-style', 'clean-other'])

gulp.task('clean-script', function () {
	return gulp.src(paths.remove.script)
		.pipe(rimraf())
})

gulp.task('clean-style', function () {
	return gulp.src(paths.remove.style)
		.pipe(rimraf())
})

gulp.task('clean-other', function () {
	return gulp.src(paths.remove.other)
		.pipe(rimraf())
})

gulp.task('gzip', function () {
	return gulp.src(paths.src.gzip)
		.pipe(gzip({
			append: true,
			gzipOptions: {level: 9}
		}))
		.pipe(gulp.dest('./public'))
})
