"use strict";

var gulp = require("gulp");
var typescript = require("typescript");
var ts = require("gulp-typescript");
var webserver = require('gulp-webserver');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var babelify = require("babelify");
var project = ts.createProject("tsconfig.json", { typescript: typescript });
var removeCode = require('gulp-remove-code');
var clean = require('gulp-clean');
var options = {};

gulp.task("through", function() {
  return gulp
    .src(["src/index.html"/*, "public/favicon.ico", "public/manifest.json"*/])
    .pipe(gulp.dest("dist"));
});

gulp.task("copy-asset", function() {
  return gulp.src(["src/assets/**/*"]).pipe(gulp.dest("dist/assets"));
});


gulp.task("compile", function() {
  var result = gulp.src("src/**/*{ts,tsx}").pipe(removeCode({ gulpmode: false })).pipe(project());
  return result.js.pipe(gulp.dest(".tmp"));
});
gulp.task("clean", function() {
  return gulp.src('.tmp', {read: false})
        .pipe(clean());
})

gulp.task(
  "bundle", 
  function() {
    var b = browserify([".tmp/index.js"]).transform("babelify", {
      presets: ["@babel/preset-env"]
    });
    return b
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("dist"));
  }
);

gulp.task('serve', function () {
  return gulp.src("./dist")
    .pipe(webserver({
      port: 3001,
      livereload: true
    }));
});

gulp.task("watch", function() {
  gulp.watch("src/**/*", gulp.series("build-dev"));
});

gulp.task('build', gulp.series("through", "copy-asset", "compile", "bundle", "clean"));

gulp.task('build-dev', gulp.series("compile", "bundle"))
gulp.task('dev',gulp.series("build", gulp.parallel('watch', 'serve')));
