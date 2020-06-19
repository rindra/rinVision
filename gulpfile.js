//var gulp = require('gulp-param')(require('gulp'), process.argv),
var gulp = require('gulp'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  uglifycss = require('gulp-uglifycss'),
  uglify = require('gulp-uglify'),
  prettify = require('gulp-prettify'),
  minifyHTML = require('gulp-minify-html'),
  fileinclude = require('gulp-file-include'),
  shell = require('gulp-shell'),
  insertLines = require('gulp-insert-lines'),
  request = require('request'),
  fs = require('fs');

function _get(loc) {
  return new Promise((resolve, reject) => {
    request(loc, function (e, r, b) {
      resolve(JSON.parse(b));
    })
  })
}

gulp.task('connect-es6', function (done) {
  connect.server({
    root: 'release',
    port: 8888,
    livereload: true
  });
  done();
});
gulp.task('watch-es6', function (done) {
  gulp.watch(['./release/index.html', './release/htmls/*.html', './release/js/*.js', './release/less/*.less'], gulp.parallel('html', 'less', 'js'));
  done();
})

gulp.task('html', function () {
  return gulp.src('./release/index.html')
    .pipe(prettify({
      preserve_newlines: true
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './release/htmls/',
      context: {
        release: false
      }
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest('release/castlight/www'))
});
gulp.task('less', function () {
  return gulp.src('./release/less/style.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(uglifycss())
    .pipe(gulp.dest('release/castlight/www'))
});
gulp.task('js', function () {
  return gulp.src('./release/js')
    .pipe(shell([
      'babel --presets env release/js/app.js -o release/castlight/www/all.js'
    ]))
    .pipe(shell([
      'gulp version',
      'npm run webpack'
    ]))
    .pipe(shell([
      'rsync -av release/castlight/www/ release/engage/www/ --exclude res'
    ]))
    .pipe(shell([
      'rsync -av release/castlight/www/ release/healthyblue/www/ --exclude res'
    ]))
    .pipe(connect.reload())
});

gulp.task('version', function () {
  return _get('https://castlight-db.herokuapp.com/config/version')
    .then(data => gulp.src('./')
      .pipe(shell([
    'touch release/castlight/www/v.json',
    'echo "{\\""complete\\"": \\""2.' + Number(data[0].complete + 1) + '\\"", \\""engage\\"": \\""2.' + Number(data[0].engage + 1) + '\\"", \\""healthyblue\\"": \\""2.' + Number(data[0].healthyblue + 1) + '\\""}" > release/castlight/www/v.json'
    ]))
      .pipe(gulp.dest('./'))
    )
})

gulp.task('insrt_less', function () {
  let m = process.argv[process.argv.indexOf('--m') + 1]
  return gulp.src('./release/less/homepage.less')
    .pipe(insertLines({
      'before': /\.\_pcp\_details\_top\(\)\;/i,
      'lineBefore': m
    }))
    .pipe(gulp.dest('release/less'));
});
gulp.task('insrt_modules', function () {
  let m = process.argv[process.argv.indexOf('--m') + 1]
  return gulp.src('./release/less/modules.less')
    .pipe(insertLines({
      'before': /\@import 'footer';/i,
      'lineBefore': m
    }))
    .pipe(gulp.dest('release/less'));
});
gulp.task('insrt_html', function () {
  let m = process.argv[process.argv.indexOf('--m') + 1]
  return gulp.src('./release/htmls/card_types.html')
    .pipe(insertLines({
      'before': /<!--do not delete-->/i,
      'lineBefore': m
    }))
    .pipe(gulp.dest('release/htmls'));
});
gulp.task('insrt_js', function () {
  let m = process.argv[process.argv.indexOf('--m') + 1]
  return gulp.src('./release/js/homepage.js')
    .pipe(insertLines({
      'before': /import pcp_details_top/i,
      'lineBefore': m
    }))
    .pipe(gulp.dest('release/js'));
});
gulp.task('insrt_class', function () {
  let m = process.argv[process.argv.indexOf('--m') + 1]
  return gulp.src('./release/js/homepage.js')
    .pipe(insertLines({
      'before': /search_results_top_definition,/,
      'lineBefore': m
    }))
    .pipe(gulp.dest('release/js'));
});

gulp.task('addcardtype', (done) => {
  let m = process.argv[process.argv.indexOf('--m') + 1]
  if (m && process.argv.indexOf('--m') != -1) {
    return gulp.src('./')
      .pipe(shell([
               'touch release/htmls/' + m + '.html',
               'echo "<script id=' + m + '_template type=text/x-handlebars-template></script>" >> release/htmls/' + m + '.html',
               'touch release/less/' + m + '.less',
               'echo "._' + m + '() { [data-type=' + m + '] {}}" >> release/less/' + m + '.less',
               'touch release/js/' + m + '.js',
               'echo "import CardType from \'./card_type\';export default class ' + m + ' extends CardType {constructor(type,id,homepage) {super(type,id);this.homepage=homepage;}init(card, container, home) {return new Promise((resolve, reject) => {super.init(card, container, home).then(status => {return this.init_nav(status, card, container, home)}).then(status => {resolve(status);}).catch(e => console.log(e));})}init_nav(status, card, container, home) {return new Promise((resolve, reject) => {resolve(status);})}};" >> release/js/' + m + '.js'
               ]))
      .pipe(shell([
               'gulp insrt_less --m "._' + m + '();"'
               ]))
      .pipe(shell([
               'gulp insrt_modules --m "@import \'' + m + '\';"'
               ]))
      .pipe(shell([
               'gulp insrt_html --m "@@include(\'' + m + '.html\')"'
               ]))
      .pipe(shell([
               'gulp insrt_js --m "import ' + m + ' from \'./' + m + '\';"'
               ]))
      .pipe(shell([
               'gulp insrt_class --m "' + m + ',"'
               ]))
  } else {
    console.log("USAGE:  gulp addcardtype --m <card_type>");
    done()
  }

})

gulp.task('default', gulp.parallel('connect-es6', gulp.parallel('watch-es6')))
