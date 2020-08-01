let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');


//uglify = required('gulp-uglify'),
//concat = required('gulp-concat');

//compile scss/sass into css
//to load imported css files into scss to css run task gulp scss
gulp.task('scss', function() {
    //return gulp.src('app/scss/**/*(scss|sass)') to watch different file formats
    return gulp.src('app/scss/**/*scss')
        .pipe(sass({ outputStyle: 'compressed' })) // or outputStyle: 'expanded'
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function() {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

//this is used if you have some libraries, like jquery or slick slider (not active now)
gulp.task('js', function() {
    return gulp.src([
            'blabla/test.js',
            'node_modules/slick-carousel/slick,slick.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*js', gulp.parallel('script'));
});

//terminal command: gulp
gulp.task('default', gulp.parallel('scss', 'script', 'browser-sync', 'watch'));
//gulp.task('default', gulp.parallel('scss','js', 'browser-sync', 'watch'));