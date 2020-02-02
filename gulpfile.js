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

gulp.task(
  "bundle", ["through", "copy-asset", "compile"],
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

gulp.task("watch", ["bundle"], function() {
  gulp.watch("src/**/*", ["bundle"]);
});

gulp.task('serve', ['bundle'], function () {
  return gulp.src("./dist")
    .pipe(webserver({
      port: 3001,
      livereload: true
    }));
});

gulp.task('serve-watch', ['watch'], function () {
  return gulp.src("./dist")
    .pipe(webserver({
      port: 3001,
      livereload: true
    }));
});

