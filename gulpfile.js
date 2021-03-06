var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    sass          = require('gulp-sass'),
    pug           = require('gulp-pug'),
    browserSync   = require('browser-sync'),
    watch         = require('gulp-watch'),
    concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleanCSS      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		del           = require('del'),
		imagemin      = require('gulp-imagemin'),
		cache         = require('gulp-cache'),
		autoprefixer  = require('gulp-autoprefixer'),
		spritesmith   = require('gulp.spritesmith'),
    plumber       = require('gulp-plumber'),
    errorHandler  = require('./util/handle-errors.js'),
    notify        = require("gulp-notify");

/* Task to compile common.js */
gulp.task('common-js', function() {
	return gulp.src([
		'src/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/jquery-ui-1.12.1/jquery-ui.min.js',
		'src/libs/moment/moment.min.js',
		'src/libs/moment/moment-with-locales.min.js',
		'src/libs/bootstrap/js/bootstrap.min.js',
		'src/libs/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
		'src/libs/fancybox/dist/jquery.fancybox.min.js',
		'src/libs/swiper/dist/js/swiper.min.js',
		'src/libs/nouislider/nouislider.min.js',
		'src/libs/select2/dist/js/select2.min.js',
		'src/libs/masked/jquery.maskedinput.js',
		// 'src/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('build/src/js'))
	.pipe(browserSync.reload({stream: true}));
});

/* Task to browser-sync */
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

/* Task to compile sass */
gulp.task('sass', function() {  
  return gulp.src('./src/sass/style.sass')
    .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS()) // Опционально, закомментировать при отладке
    .pipe(gulp.dest('./build/src/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function buildHTML() {
  return gulp.src('src/template/pages/*.pug')
  .pipe(plumber({ errorHandler: errorHandler }))
  .pipe(pug({
  	pretty: true,
  }))
  .pipe(gulp.dest('./build/'));
});

/* Task to watch sass changes */
gulp.task('sass-watch', function () {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
});

/* Task to watch templates changes */
gulp.task('watch-templates', function() {  
 gulp.watch('./src/template/**/*.pug' , ['html']);
});

gulp.task('imagemin', function() {
	return gulp.src('src/image/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('build/src/image')); 
});

/* Task to compile sprite */
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/image/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
		cssName: 'sprite.css',
		padding: 20
  }));
  return spriteData.pipe(gulp.dest('build/src/image/sprites/'));
});

gulp.task('removedist', function() { return del.sync('src'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

/* Task when running `gulp` from terminal */
gulp.task('default', ['sass', 'sass-watch', 'html', 'watch-templates', 'js', 'browser-sync']);