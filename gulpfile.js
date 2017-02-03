/**
 * @fileOverview Logic for the guld build process
 * @description https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md and https://developers.google.com/web/tools/setup/workspace/setup-buildtools?hl=en
 * @version 0.0.0
 * Installation:
 *      $ npm install -g gulp
 *      $ npm init
 * Usage
 *      $ gulp
 * To run individual tasks:
 *      $ gulp <task> <othertask>
 * @TODO define and implement other tasks
 * examples
 *      $ gulp web-build
 *      $ gulp android-build
 *      $ gulp ios-buld
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rjs = require('gulp-requirejs');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');


gulp.task('default', ["prepare-build"], function () {
    // place code for your default task here

})

// build dev codebase
gulp.task('dev-build', function () {
    gulp.src("node_modules/fee/build.js")
        .pipe(gulp.dest('.')); 
    gulp.src("node_modules/fee/sass/**")
        .pipe(gulp.dest('sass'));
    gulp.src("node_modules/fee/www/**")
        .pipe(gulp.dest('www'));
});

// build dev update
gulp.task('dev-update', function () {
    gulp.src("node_modules/fee/build.js")
        .pipe(gulp.dest('.'));
    gulp.src("node_modules/fee/www/app/**")
        .pipe(gulp.dest('www/app'));
    gulp.src("node_modules/fee/www/config/backbone-config.js")
        .pipe(gulp.dest('www/config/backbone-config.js'));
    gulp.src("node_modules/fee/www/lib/**")
        .pipe(gulp.dest('www/lib'));
    gulp.src("node_modules/fee/www/utils/**")
        .pipe(gulp.dest('www/utils'));
});

// build web production codebase
gulp.task('web-build', function () {
    // Get CSS
    gulp.src("dist/minified/www/css/**")
        .pipe(gulp.dest('dist/web/www/css/')); // Get CSS
    gulp.src("dist/minified/www/index.html")
        .pipe(gulp.dest('dist/web/www/'));
    gulp.src("dist/minified/www/main-built.js")
        .pipe(gulp.dest('dist/web/www/'));
    gulp.src("dist/minified/www/js/require.js")
        .pipe(gulp.dest('dist/web/www/js/'));
    gulp.src("dist/minified/www/img")
        .pipe(gulp.dest('dist/web/www/img/'));
    // other build tasks
});

// build android production codebase
gulp.task('android-build', function () {
    gulp.src("www")
        .pipe(gulp.dest('dist/prod/android'));
    // other tasks
});

// build ios production codebase
gulp.task('ios-build', function () {
    gulp.src("www")
        .pipe(gulp.dest('dist/prod/ios/'));
});

// Utility tasks

// prepare-production
gulp.task('prepare-build', ['minify-js', 'minify-css', 'minify-html', 'rjs-build'], function () {
    // minify js
    // minify css
    // minify images
    // rjs builds
    // pipe it to the output DIR
});

// requirejs optimizer with rjs
gulp.task('rjs-build', function () {
    rjs({
            baseUrl: "www/js",
            mainConfigFile: 'www/js/main.js',
            name: "main",
            out: "main-built.js",
        })
        .pipe(uglify())
        .pipe(gulp.dest('dist/minified/www/')); // pipe it to the output DIR

});

// gulp minifier modules
gulp.task("minify-js", function () {
    gulp.src('www/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/minified/www/js/'));
    gulp.src('www/js/**/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/minified/www/js/'));
    gulp.src('www/js/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/minified/www/js/lib/'));
});

// Minify html
gulp.task('minify-html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };
    // minify default templates
    gulp.src('www/js/app/templates/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/minified/www/js/app/tempates/'));

    // minify custom templates
    gulp.src('www/js/custom/custom-tpl/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/minified/www/js/custom/custom-tpl/'));

    gulp.src('www/index.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/minified/www/'));
});

// Minify CSS
gulp.task('minify-css', function () {
    gulp.src('www/css/index.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/minified/www/css/'));
    gulp.src("www/css/fonts/**/*")
        .pipe(gulp.dest('dist/minified/www/css/fonts/'));
});

// Minify images
gulp.task('minify-images', function () {
    gulp.src('www/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('dist/minified/www/img/'));
});