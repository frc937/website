const gulp=require('gulp'),gutil=require('gulp-util'),del=require('del'),
      pug=require('gulp-pug'),
      sass=require('gulp-sass'),uglifycss=require('gulp-uglifycss'),
      uglify=require('gulp-uglify'),
      run=require('gulp-run')

gulp.task('default',['clean','build-css','build-html','build-js','restart','watch'])

gulp.task('watch',function() {
  gulp.watch(['source/*','source/**/*','templates/*'],['clean','build-css','build-html','build-js','restart'])
})

gulp.task('clean',function() {
  return del(['public/*'])
})
gulp.task('build-html',function() {
  return gulp.src(['source/*.pug','source/**/*.pug'])
    .pipe(pug())
    .pipe(gulp.dest('public'))
})
gulp.task('build-css',function() {
  return gulp.src(['source/*.sass','source/**/*.sass'])
    .pipe(sass())
    .pipe(uglifycss())
    .pipe(gulp.dest('public'))
})
gulp.task('build-js',function() {
  return gulp.src(['source/*.js','source/**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('public'))
})
gulp.task('restart',function() {
  run('systemctl restart node').exec()
})