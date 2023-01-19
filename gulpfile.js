const gulp        = require('gulp'); 
const browserSync = require('browser-sync'); // подключение плагина с сайта//

const sass = require('gulp-sass')(require('sass'));

const rename = require("gulp-rename");

const autoprefixer = require('gulp-autoprefixer');

const cleanCSS = require('gulp-clean-css');

// Static server
//СОЗДАНИЕ ЗАДАЧИ ПЛАГИНА//
//gulp.task обращение к пакету task -задача
//в baseDir указать папку откуда будет запусться live
gulp.task('server', function() { //
    browserSync.init({
        server: {
            baseDir: "src" //обращение к папке 
        }
    });
});

//создание компилятора сас

gulp.task('styles', function() {
    return gulp.src("src/sass/blocks/*.+(scss|sass)") // return -результат при выполнии
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // pipe - взяьб файл и что то сделать с ним
            .pipe(rename({
                prefix: "",
                suffix: ".min",
            }))
            .pipe(browserSync.reload({
                stream: true
            }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
});



gulp.task('watch', function(){  
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
