const gulp = require('gulp');// 引入gulp模块,生成gulp对象
const html = require('gulp-minify-html');//压缩html的插件
const css = require('gulp-minify-css');//压缩css的插件

//const script = require('gulp-uglify');//压缩js的插件
const babel = require('gulp-babel');
// gulp.task('js', () =>
//     gulp.src('src/script/*.js')
//         .pipe(babel({
//             presets: ['@babel/env'], 
//             plugins: ['@babel/transform-runtime']
//         }))
//         .pipe(gulp.dest('dist/script'))
// );
var uglify = require('gulp-uglify');
const  babe= require(" babel-preset-env");
gulp.task('script',function(){
  /////找到文件
  gulp.src('src/script/*.js')
  //////把ES6代码转成ES5代码
  .pipe(babel())
  /////压缩文件
  .pipe(uglify())
  /////另存压缩后文件
  .pipe(gulp.dest('dist/script'));
});

//es6转es5的三个模块
//gulp-babel@7   babel-core       babel-preset-es2015
 //const babel = require('gulp-babel');//主要
 const babelcore = require('babel-core');
// const es2015 = require('babel-preset-es2015');

//sass编译
//gulp-sass gulp-sourcemaps gulp-load-plugins 
//const sass = require('gulp-sass');
//引入生成.map文件模块
//const sourcemaps = require('gulp-sourcemaps');
//生成.map文件
 //const plugins = require('gulp-load-plugins')();//返回的是一个函数体。需要再次执行。


//gulp-watch监听模块
 //const watch = require('gulp-watch');

//gulp-imagemin图片压缩(png)
 //const imagemin = require('gulp-imagemin');

//注意事项：gulp操作后的路径对应操作前的路径。


/*
gulp.task(taskname,callback):创建任务  taskname任务名称  callback执行的回调
gulp.src(url):设置引入文件的路径
gulp.dest():输出文件设置(如果不存在目录名，自动生成)
pipe():管道流(将任务链式连接起来)
gulp 任务名   -- 执行任务。
*/

//1.gulp复制
// gulp.task('copyfile', () => {
//     return gulp.src('src/fonts/*.txt') //加载文件
//         .pipe(gulp.dest('dist/fonts/'));//输出文件。
// });

//2.html压缩
gulp.task('uglifyhtml', function() {
    return gulp.src('src/html/*.html')
        .pipe(html())//执行压缩
        .pipe(gulp.dest('dist/html/'));
});

//3.压缩css
// gulp.task('uglifycss', () => {
//     return gulp.src('src/style/*.css')
//         .pipe(css())//执行压缩
//         .pipe(gulp.dest('dist/style/'));
// });
// gulp.task('minify-css', () => {
//   return gulp.src('src/style/*.css')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest('dist/style'));
// });
    
   

//4.压缩js
gulp.task('uglifyjs', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({//先将es6转换成es5
            presets: ['es2015']//es2015->es6  es2016->es7...
        }))
        .pipe(script())//再执行压缩
        .pipe(gulp.dest('dist/script/'));
});

//5.编译sass,同时生成.map文件(.map调式文件)
// gulp - sass gulp - sourcemaps gulp - load - plugins
// gulp.task('compilesass', () => {
//     return gulp.src('src/sass/*.scss')
//         //初始化gulp-sourcemaps插件
//         .pipe(plugins.sourcemaps.init())
//         .pipe(plugins.sass({
//             outputStyle: 'compressed'
//         }))
//         //通过sourcemaps,生成.map文件
//         .pipe(plugins.sourcemaps.write('.'))
//         .pipe(gulp.dest('dist/sass/'));
// });

//6.图片压缩插件-imagemin@6
//对png最大的压缩，其他的格式几乎压不动。
// gulp.task('uglifyimg', () => {
//     return gulp.src('src/img/*.{png,gif,jpg,ico}')
//         .pipe(imagemin())//执行压缩
//         .pipe(gulp.dest('dist/img/'));
// });

//7.监听插件-gulp-watch()
//参1:监听的目录，数组的形式
//参2:通过gulp.parallel()并行监听任务名。
//监听上面的任务，监听之前任务必须先跑一次。再进行监听。

//任务名为default,直接gulp运行，默认任务名。
// gulp.task('default', function () {
//     watch(['src/html/*.html', 'src/style/*.css', 'src/script/*.js', 'src/img/*.{png,gif,jpg,ico}'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifyjs', 'uglifyimg'));
// });













