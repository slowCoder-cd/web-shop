const gulp = require("gulp");
const html = require('gulp-minify-html');//压缩html的插件
const css = require('gulp-minify-css');//压缩css的插件
const script = require('gulp-uglify'); //js压缩
const babel = require("gulp-babel");
const watch = require('gulp-watch');

const imagemin = require('gulp-imagemin');//gulp-imagemin图片压缩(png)
//sass编译
//gulp-sass gulp-sourcemaps gulp-load-plugins 
const sass = require('gulp-sass');
//引入生成.map文件模块
const sourcemaps = require('gulp-sourcemaps');
//生成.map文件
const plugins = require('gulp-load-plugins')();//返回的是一个函数体。需要再次执行。
//1.压缩js并且将es6转化为es5
gulp.task('uglifyjs', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({//先将es6转换成es5
            presets: ['es2015']//es2015->es6  es2016->es7...
        }))
        .pipe(script())//再执行压缩
        .pipe(gulp.dest('online/script/'));
});
// gulp.task('uglifyjs1', () => {
//     return gulp.src('src/script/function_module/*.js')
//         .pipe(babel({//先将es6转换成es5
//             presets: ['es2015']//es2015->es6  es2016->es7...
//         }))
//         .pipe(script())//再执行压缩
//         .pipe(gulp.dest('dist/script/function_module/'));
// });
//，避免 gulp-babel 编译时出现Cannot find module '@babel/core'， gulp-babel 的版本建议安装7.0.1 ($ npm install gulp-babel@7 --save-dev)

// gulp - sass gulp - sourcemaps gulp - load - plugins
// Error: ENOENT: no such file or directory, scandir --找不到文件
// set SASS_BINARY_PATH=C:\node\win32-x64-72_binding.node
//2.压缩sass
gulp.task('compilesass', () => {
    return gulp.src('src/sass/*.scss')
        //初始化gulp-sourcemaps插件
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        }))
        //通过sourcemaps,生成.map文件
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('online/sass/'));
});
//3.压缩html
gulp.task('uglifyhtml', () => {
    return gulp.src('src/html/*.html')
        .pipe(html())//执行压缩
        .pipe(gulp.dest('online/html/'));
});

//4.压缩css
gulp.task('uglifycss', () => {
    return gulp.src('src/style/*.css')
        .pipe(css())//执行压缩
        .pipe(gulp.dest('online/style/'));
})
//5.图片压缩插件-imagemin@6
//对png最大的压缩，其他的格式几乎压不动。
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(imagemin())//执行压缩
        .pipe(gulp.dest('online/img/'));
});
//6.监听
//参1:监听的目录，数组的形式
//参2:通过gulp.parallel()并行监听任务名。
//监听上面的任务，监听之前任务必须先跑一次。再进行监听。
gulp.task('default', function () {
    watch(['src/html/*.html', 'src/style/*.css', 'src/script/*.js','src/sass/*.scss', 'src/img/*.{png,gif,jpg,ico}'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifyjs', 'compilesass','uglifyimg'));
});







