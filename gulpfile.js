const gulp = require('gulp');
const browserSync = require('browser-sync').create(); //обновление браузера
const less = require('gulp-less'); //компиляция less файлов
const plumber = require('gulp-plumber'); //инструмент для выявления ошибок
const notify = require('gulp-notify'); //сигнализатор ошибок
const autoprefixer = require('gulp-autoprefixer'); //автопрефиксер
const sourcemaps = require('gulp-sourcemaps'); //исходные карты
const pug = require('gulp-pug'); //компиляция pug в html
const del = require('del'); //удаление папок, файлов

// Фнкция удаления (очистки) папки BUILD
function cleanBuild () {
    return del('./build/')
};

// Функция компиляции PUG-файлов в HTML-файлы

function gulpPug (){
    return gulp.src('./src/pug/pages/**/*.pug')
    .pipe(plumber({
        errorHandler: notify.onError(function(err){
            return {
                title: 'Pug',
                message: err.message
            }
        })
    }))

    .pipe(pug({pretty: true}))

    .pipe(gulp.dest('./build/'))

    .pipe(browserSync.stream())
};

// Функция компиляции LESS-файлов в CSS-файлы

function gulpLess (){
    return gulp.src('./src/less/main.less')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))

        .pipe(sourcemaps.init())

        .pipe(less())

        .pipe(autoprefixer({
            grid: true,
            overrideBrowserlist: ['last 3 versions'],
            cascade: true
        }))

        .pipe(sourcemaps.write())

        .pipe(gulp.dest('./build/css/'))

        .pipe(browserSync.stream())
};

// Функция запуска сервера

function gulpServer (done){
    browserSync.init({server: {baseDir: "./build/"}});
    done();
};

// Функция копирования JS файлов 

function copyJs (){
    return gulp.src('./src/js/**/*.*')
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
};

// Функция копирования LIBS файлов библиотек

function copyLibs (){
    return gulp.src('./src/libs/**/*.*')
        .pipe(gulp.dest('./build/libs'))
        .pipe(browserSync.stream())
};

// Функция копирования IMG картинок

function copyImg (){
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream())
};

// Функция смотритель, смотрит и в случае изменения запускает побочные функции

function gulpWatch (){
    gulp.watch('./src/pug/**/*.*', gulp.series(gulpPug)); //.on('change', browserSync.reload)
    gulp.watch('./src/less/**/*.less', gulp.series(gulpLess));
    gulp.watch('./src/js/**/*.js', gulp.series(copyJs)); //.on('change', browserSync.reload)
    gulp.watch('./src/libs/**/*.*', gulp.series(copyLibs)); //.on('change', browserSync.reload)
    gulp.watch('./src/img/**/*.*', gulp.series(copyImg)); //.on('change', browserSync.reload)
    //gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
};


// Задача для галпа.

gulp.task('default', gulp.series(cleanBuild, gulpPug, gulpLess, copyJs, copyLibs, copyImg, gulp.parallel(gulpServer, gulpWatch)));
//gulp.task('default', gulp.series(gulpPug));