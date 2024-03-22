var gulp = require("gulp"), // main
  sass = require("gulp-sass")(require("sass")), // scss compiler
  uglify = require("gulp-uglify"), // minify js files
  rename = require("gulp-rename"), // rename files
  cssmin = require("gulp-cssmin"), // minify css files
  merge = require("merge-stream"), // mearge two task
  babel = require("gulp-babel"), // convert next generation JavaScript, today.
  npmlodash = require("lodash"), // perfoming oops in gulp
  smushit = require("gulp-smushit"), // image optimizer
  autoprefixer = require("gulp-autoprefixer"), // css propertys autoprefixer
  cssbeautify = require("gulp-cssbeautify"), // css cssbeautify
  fileinclude = require("gulp-file-include"), // include html files
  browsersync = require("browser-sync"), // browser reload
  htmlmin = require("gulp-htmlmin"); // html minify
const layout = {
  layouts: "vertical",
  sublayouts: "",
  darktheme: "false",
  rtltheme: "false",
  bodyclass: "",
  menuclass: "menupos-fixed",
  headerclass: "",
};

//  [ scss compiler ] start
gulp.task("sass", function () {
  // main style css
  var maincss = gulp
    .src("./scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest("./css"));

  // layout style css
  var layoutcss = gulp
    .src("src/assets/scss/partials/layouts/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest("dist/assets/css/layouts"));

  // Extra pages style css
  var pagescss = gulp
    .src("src/assets/scss/partials/pages/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest("dist/assets/css/pages"));

  return merge(maincss, layoutcss, pagescss);
});
//  [ scss compiler ] end

//  [ Copy assets ] start
gulp.task("build", function () {
  var required_libs = {
    js: [
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js",
      "node_modules/@popperjs/core/dist/umd/popper.min.js",
      "node_modules/prismjs/prism.js",
      "node_modules/sweetalert2/dist/sweetalert2.all.min.js",
      "node_modules/vanillajs-datepicker/dist/js/datepicker-full.min.js",
      "node_modules/notifier-js/dist/js/notifier.js",
      "node_modules/@pnotify/core/dist/PNotify.js",
      "node_modules/@pnotify/animate/dist/PNotifyAnimate.js",
      "node_modules/@pnotify/mobile/dist/PNotifyMobile.js",
      "node_modules/bootstrap-slider/dist/bootstrap-slider.min.js",
      "node_modules/tiny-slider/dist/min/tiny-slider.js",
      "node_modules/intro.js/minified/intro.min.js",
      "node_modules/vanillatree/vanillatree.min.js",
      "node_modules/clipboard/dist/clipboard.min.js",
      "node_modules/choices.js/public/assets/scripts/choices.min.js",
      "node_modules/imask/dist/imask.min.js",
      "node_modules/nouislider/dist/nouislider.min.js",
      "node_modules/wnumb/wNumb.min.js",
      "node_modules/bootstrap-switch-button/dist/bootstrap-switch-button.min.js",
      "node_modules/type-ahead/src/type-ahead.min.js",
      "node_modules/quill/dist/quill.min.js",
      "node_modules/dropzone/dist/min/dropzone-amd-module.min.js",
      "node_modules/uppy/dist/uppy.min.js",
      "node_modules/formbouncerjs/dist/bouncer.min.js",
      "node_modules/croppr/dist/croppr.min.js",
      "node_modules/simple-datatables/dist/umd/simple-datatables.js",
      "node_modules/simple-datatables/docs/7-init-destroy-import-export/utils.js",
      "node_modules/chart.js/dist/chart.min.js",
      "node_modules/highcharts/highcharts.js",
      "node_modules/highcharts/highcharts-3d.js",
      "node_modules/gmaps/gmaps.min.js",
      "node_modules/jsvectormap/dist/js/jsvectormap.min.js",
      "node_modules/jsvectormap/dist/maps/world.js",
      "node_modules/jsvectormap/dist/maps/world-merc.js",
      "node_modules/isotope-layout/dist/isotope.pkgd.min.js",
      "node_modules/apexcharts/dist/apexcharts.min.js",
      "node_modules/fullcalendar/main.min.js",
      "node_modules/simplemde/dist/simplemde.min.js",
      "node_modules/flatpickr/dist/flatpickr.min.js",
      "node_modules/datatables.net/js/jquery.dataTables.min.js",
      "node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js",
      "node_modules/datatables.net-select/js/dataTables.select.min.js",
      "node_modules/datatables.net-autofill-bs5/js/autoFill.bootstrap5.min.js",
      "node_modules/datatables.net-keytable-bs5/js/keyTable.bootstrap5.min.js",
      "node_modules/datatables.net-scroller-bs5/js/scroller.bootstrap5.min.js",
      "node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
      "node_modules/datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js",
      "node_modules/datatables.net-keytable/js/dataTables.keyTable.min.js",
      "node_modules/datatables.net-colreorder/js/dataTables.colReorder.min.js",
      "node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js",
      "node_modules/datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js",
      "node_modules/datatables.net-autofill/js/dataTables.autoFill.min.js",
      "node_modules/datatables.net-buttons-bs5/js/buttons.bootstrap5.min.js",
      "node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
      "node_modules/datatables.net-buttons/js/buttons.colVis.min.js",
      "node_modules/datatables.net-buttons/js/buttons.print.min.js",
      "node_modules/datatables.net-buttons/js/buttons.html5.min.js",
      "node_modules/pdfmake/build/pdfmake.min.js",
      "node_modules/jszip/dist/jszip.min.js",
      "node_modules/pdfmake/build/vfs_fonts.js",
    ],
    css: [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/perfect-scrollbar/css/perfect-scrollbar.css",
      "node_modules/animate.css/animate.min.css",
      "node_modules/prismjs/themes/prism-coy.css",
      "node_modules/vanillajs-datepicker/dist/css/datepicker-bs5.min.css",
      "node_modules/notifier-js/dist/css/notifier.css",
      "node_modules/@pnotify/core/dist/PNotify.css",
      "node_modules/@pnotify/core/dist/BrightTheme.css",
      "node_modules/@pnotify/mobile/dist/PNotifyMobile.css",
      "node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css",
      "node_modules/tiny-slider/dist/tiny-slider.css",
      "node_modules/intro.js/minified/introjs.min.css",
      "node_modules/vanillatree/vanillatree.css",
      "node_modules/nouislider/dist/nouislider.min.css",
      "node_modules/bootstrap-switch-button/css/bootstrap-switch-button.min.css",
      "node_modules/quill/dist/quill.core.css",
      "node_modules/quill/dist/quill.snow.css",
      "node_modules/quill/dist/quill.bubble.css",
      "node_modules/dropzone/dist/min/dropzone.min.css",
      "node_modules/uppy/dist/uppy.min.css",
      "node_modules/croppr/dist/croppr.min.css",
      "node_modules/simple-datatables/dist/style.css",
      "node_modules/jsvectormap/dist/css/jsvectormap.min.css",
      "node_modules/fullcalendar/main.css",
      "node_modules/simplemde/dist/simplemde.min.css",
      "node_modules/flatpickr/dist/flatpickr.min.css",
      "node_modules/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css",
      "node_modules/datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css",
      "node_modules/datatables.net-colreorder-bs5/css/colReorder.bootstrap5.min.css",
      "node_modules/datatables.net-fixedheader-bs5/css/fixedHeader.bootstrap5.min.css",
      "node_modules/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css",
      "node_modules/datatables.net-scroller-bs5/css/scroller.bootstrap5.min.css",
      "node_modules/datatables.net-keytable-bs5/css/keyTable.bootstrap5.min.css",
      "node_modules/datatables.net-autofill-bs5/css/autoFill.bootstrap5.min.css",
      "node_modules/datatables.net-select-bs5/css/select.bootstrap5.min.css",
      "node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css",
    ],
  };
  npmlodash(required_libs).forEach(function (assets, type) {
    if (type == "css") {
      gulp.src(assets).pipe(gulp.dest("dist/assets/css/plugins"));
    } else {
      gulp.src(assets).pipe(gulp.dest("dist/assets/js/plugins"));
    }
  });
  var required_libs = {
    classic: [
      "node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js",
    ],
    inline: ["node_modules/@ckeditor/ckeditor5-build-inline/build/ckeditor.js"],
    balloon: [
      "node_modules/@ckeditor/ckeditor5-build-balloon/build/ckeditor.js",
    ],
    document: [
      "node_modules/@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor.js",
    ],
  };
  npmlodash(required_libs).forEach(function (assets, type) {
    if (type == "classic") {
      gulp
        .src(assets)
        .pipe(gulp.dest("dist/assets/js/plugins/ckeditor/classic"));
    }
    if (type == "inline") {
      gulp
        .src(assets)
        .pipe(gulp.dest("dist/assets/js/plugins/ckeditor/inline"));
    }
    if (type == "balloon") {
      gulp
        .src(assets)
        .pipe(gulp.dest("dist/assets/js/plugins/ckeditor/balloon"));
    }
    if (type == "document") {
      gulp
        .src(assets)
        .pipe(gulp.dest("dist/assets/js/plugins/ckeditor/document"));
    }
  });
  var cpyassets = gulp
    .src(["src/assets/**/*.*", "!src/assets/scss/**/*.*"])
    .pipe(gulp.dest("dist/assets"));
  var cpyextpage = gulp
    .src("src/html/extra-pages/**/*.*")
    .pipe(gulp.dest("dist/extra-pages"));

  var cpytinymceassets = gulp
    .src(["node_modules/tinymce/**/*.*"])
    .pipe(gulp.dest("dist/assets/js/plugins/tinymce"));

  var cpytrumbowygassets = gulp
    .src(["node_modules/trumbowyg/dist/**/*.*"])
    .pipe(gulp.dest("dist/assets/js/plugins/trumbowyg"));
  return merge(cpyassets, cpyextpage, cpytinymceassets, cpytrumbowygassets);
});
//  [ Copy assets ] end

//  [ build html ] start
gulp.task("build-html", function () {
  return gulp
    .src("src/html/**/*.html")
    .pipe(
      fileinclude({
        context: layout,
        prefix: "@@",
        basepath: "@file",
        indent: true,
      })
    )
    .pipe(gulp.dest("dist/"));
});
//  [ build html ] end

//  [ build js ] start
gulp.task("build-js", function () {
  var layoutjs = gulp
    .src("src/assets/js/*.js")
    .pipe(gulp.dest("dist/assets/js"));

  var pagesjs = gulp
    .src("src/assets/js/pages/*.js")
    .pipe(gulp.dest("dist/assets/js/pages"));

  return merge(layoutjs, pagesjs);
});
//  [ build js ] end

//  [ scss compiler ] start
gulp.task("mincss", function () {
  // main style css
  var maincss = gulp
    .src("src/assets/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest("dist/assets/css"))
    .pipe(cssmin())
    .pipe(gulp.dest("dist/assets/css"));

  // layout style css
  var layoutcss = gulp
    .src("src/assets/scss/partials/layouts/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest("dist/assets/css/layouts"))
    .pipe(cssmin())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("dist/assets/css/layouts"));

  // Extra pages style css
  var pagescss = gulp
    .src("src/assets/scss/partials/pages/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest("dist/assets/css/pages"))
    .pipe(cssmin())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("dist/assets/css/pages"));
  return merge(maincss, layoutcss, pagescss);
});
//  [ scss compiler ] end

//  [ uglify js ] start
gulp.task("uglify", function () {
  var layoutjs = gulp
    .src("src/assets/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js"));

  var pagesjs = gulp
    .src("src/assets/js/pages/*.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js/pages"));

  return merge(layoutjs, pagesjs);
});
//  [ uglify js ] end

//  [ minify html ] start
gulp.task("htmlmin", function () {
  return gulp
    .src("src/html/*.html")
    .pipe(
      fileinclude({
        context: layout,
        prefix: "@@",
        basepath: "@file",
        indent: true,
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist/default"));
});
//  [ minify html ] end

//  [ image optimizer ] start
gulp.task("imgmin", function () {
  return gulp
    .src("src/assets/img/**/*.{jpg,png}")
    .pipe(smushit())
    .pipe(gulp.dest("dist/assets/img"));
});
//  [ image optimizer ] end

//  [ watch ] start
gulp.task("watch", function () {
  gulp
    .watch("src/assets/scss/**/*.scss", gulp.series("sass"))
    .on("change", browsersync.reload);
  gulp
    .watch("src/assets/js/**/*.js", gulp.series("build-js"))
    .on("change", browsersync.reload);
  gulp
    .watch("src/html/**/*.html", gulp.series("build-html"))
    .on("change", browsersync.reload);
  gulp
    .watch("src/doc/**/*.html", gulp.series("build"))
    .on("change", browsersync.reload);
});
//  [ watch ] start

//  [ browser reload ] start
gulp.task("browserSync", function () {
  browsersync.init({
    server: "dist/",
  });
});
//  [ browser reload ] end

//  [ Default task ] start
const compile = gulp.parallel("browserSync", "watch");
gulp.task(
  "default",
  gulp.series("build", "sass", "build-js", "build-html", "imgmin", compile)
);
//  [ Default task ] end

//  [ watch minify ] start
gulp.task("watch-minify", function () {
  gulp
    .watch("src/assets/scss/**/*.scss", gulp.series("mincss"))
    .on("change", browsersync.reload);
  gulp
    .watch("src/assets/js/**/*.js", gulp.series("uglify"))
    .on("change", browsersync.reload);
  gulp
    .watch("src/html/**/*.html", gulp.series("htmlmin"))
    .on("change", browsersync.reload);
  gulp
    .watch("src/doc/**/*.html", gulp.series("build"))
    .on("change", browsersync.reload);
});
//  [ watch minify ] start

gulp.task(
  "build-prod",
  gulp.series("build", "sass", "build-js", "build-html", "imgmin")
);
