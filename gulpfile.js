const gulp = require("gulp"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  plumber = require("gulp-plumber"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer"),
  htmlmin = require("gulp-htmlmin"),
  imagemin = require("gulp-imagemin"),
  terser = require("gulp-terser"),
  del = require("del"),
  cleanCSS = require("gulp-clean-css");

  gulp.task("sass", function () {
    return (
      gulp
        .src("src/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("styles.css"))
        .pipe(
          autoprefixer({
            overrideBrowserslist: ["> 0.1%"],
            cascade: false,
          })
        )
        .pipe(cleanCSS())
        .pipe(rename("styles.min.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("src/css"))
        .pipe(gulp.dest("dist/css"))
    );
  });

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("libsjs", function () {
  return gulp
    .src([
      "src/libs/jquery/jquery-3.5.1.min.js",
      "src/libs/slick/slick.min.js",
    ])
    .pipe(concat("libs.min.js"))
    .pipe(terser())
    .pipe(gulp.dest("src/js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("scripts", function () {
  return gulp
    .src(["src/js/script.js"])
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(rename("scripts.min.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("src/js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("imgs", function () {
  return gulp
    .src("src/imgs/**/*.+(jpg|jpeg|png|gif|webp)")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
      })
    )
    .pipe(gulp.dest("dist/imgs"));
});

gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*.+(ttf|woff|woff2|eot|svg|otf)")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("clean", function (done) {
  del.sync("dist");
  done();
});

gulp.task("watch", function () {
  gulp.watch("src/*.html", gulp.parallel("html"));
  gulp.watch("src/sass/**/*.scss", gulp.parallel("sass"));
  gulp.watch("src/js/script.js", gulp.parallel("scripts"));
  gulp.watch("src/imgs/*.+(jpg|jpeg|png|gif|webp)", gulp.parallel("imgs"));
  gulp.watch(
    "src/fonts/**/*.+(ttf|woff|woff2|eot|svg)",
    gulp.parallel("fonts")
  );
});

// Build Production Site with all updates
gulp.task(
  "build",
  gulp.series("html", "sass", "libsjs", "scripts", "imgs", "fonts")
);

// Watch for all file changes during work
gulp.task(
  "default",
  gulp.parallel(
    "build",
    "watch",
  )
);
