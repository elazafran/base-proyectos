/*
 * Dependencias
 */

var gulp = require("gulp");
var sass = require("npm install gulp-sass --save-dev");
var connect = require("gulp-connect");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var livereload = require("gulp-livereload");

gulp.task("connect", function() {
    connect.server({
        root: "public",
        livereload: true
    });
});

// keeps gulp from crashing for scss errors
gulp.task("sass", function() {
    return gulp
        .src("./sass/*.scss")
        .pipe(sass({ errLogToConsole: true }))
        .pipe(gulp.dest("./public/css"));
});

gulp.task("javascript", function() {
    gulp
        .src("js/*.js")
        .pipe(concat("todo.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./public/js"));
});

gulp.task("livereload", function() {
    gulp.src("./public/**/*").pipe(connect.reload());
});

gulp.task("watch", function() {
    gulp.watch("./sass/**/*.scss", ["sass"]);
    gulp.watch("./js/**/*.js", ["javascript"]);
    gulp.watch("./public/**/*", ["livereload"]);

});
gulp.task("default", ["connect", "watch", "sass", "javascript"]);
// gulp.task(
//     "default",
//     gulp.series(
//         "build",
//         gulp.parallel("connect", "watch", "sass", "javascript", "livereload")
//     )
// );