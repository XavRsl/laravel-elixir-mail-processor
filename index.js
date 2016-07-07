var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var inky = require('inky');
var prettify = require('gulp-prettify');
var fs = require('fs');
var siphon = require('siphon-media-query');
var lazypipe = require('lazypipe');
var inlineCss = require('gulp-inline-css');
var htmlmin = require('gulp-htmlmin');
var injectString = require('gulp-inject-string');

var Task = Elixir.Task;

Elixir.extend('processEmails', function(options) {

    new Task('processEmails', function() {
        return gulp
            .src('resources/emails/**/*.blade.php')
            .pipe(inky())
            .pipe(prettify({ indent_size: 2 }))
            .pipe(injectString.replace('-&gt;', '->'))
            .pipe(injectString.replace('=&gt;', '=>'))
            .pipe(injectString.replace('&quot;', '"'))
            .pipe(injectString.replace('&apos;', '\''))
            .pipe(inliner('resources/assets/css/foundation.css'))
            .pipe(gulp.dest('resources/views/emails'));
    })
    .watch('./resources/emails/**');

    function inliner(css) {
        var css = fs.readFileSync(css).toString();

        var pipe = lazypipe()
            .pipe(injectString.replace, '<!-- <style> -->', '<style>'+css+'</style>')
            .pipe(inlineCss)
            .pipe(htmlmin, {
                collapseWhitespace: true,
                minifyCSS: true
            });

        return pipe();
    }
});
