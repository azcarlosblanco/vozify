var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano    = require('gulp-cssnano'),
    argv       = require('yargs').argv,
    gulpif     = require('gulp-if'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    imagemin   = require('gulp-imagemin'),
    del        = require('del'),
    sync       = require('browser-sync').create();

var isProduction = (argv.prod) ? true : false;

var config = {
    scssDir: './assets/stylesheets/scss',
    cssDir: './assets/stylesheets/css',
    scriptsDir: './assets/scripts',
    jsDir: './assets/scripts/js',
    imagesDir: './assets/images',
    imgDir: './assets/images/min'
};

gulp.task('style', function() {
    return gulp.src(config.scssDir + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulpif(isProduction, cssnano(), sourcemaps.write('maps')))
        .pipe(gulp.dest(config.cssDir))
        .pipe(sync.stream());
});

gulp.task('concat', function() {
    return gulp.src([
      config.scriptsDir + '/scripts.js'
      ])
      .pipe(concat('app.js'))
      .pipe(gulp.dest(config.jsDir));
});

gulp.task('compress',  ['concat'], function() {
    return gulp.src(config.jsDir + '/app.js')
       .pipe(uglify())
       .on('error', console.error.bind(console))
       .pipe(gulp.dest(config.jsDir + '/min'));
});

gulp.task('imagemin', function() {
    return gulp.src(config.imagesDir + '/*.{png,jpg,jpge}')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(config.imgDir + '/'));
});


gulp.task('cleanup', function() {
    del(config.cssDir + '/maps/*');
    del(config.cssDir + '/maps');

});

gulp.task('js-sync', ['compress'], function() {
    sync.reload();
});

gulp.task('watch', function() {
  return gulp.watch(config.scssDir + '/**/*.scss', function() {
      gulp.start('style');
  });
});

gulp.task('browsersync', ['compress', 'style'], function() {
    sync.init({
        server: {
            baseDir: "./"
        },
        port: 3100
    });
    gulp.watch('./*.html').on('change', sync.reload);
    gulp.watch(config.scssDir + '/**/*.scss', ['style']);
    gulp.watch(config.scriptsDir + '/*.js', ['js-sync']);
});
