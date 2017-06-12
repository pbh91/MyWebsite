'use strict';
var gulpIgnore = require('gulp-ignore');
var ngConstant = require('gulp-ng-constant');
var args = require('yargs').argv;
var bower = require('gulp-bower');
var replace = require('gulp-replace'); 
var _ = require('underscore.string')
  , gulp = require('gulp')
  , path = require('path')
  , $ = require('gulp-load-plugins')({
    pattern: [
      'del',
      'gulp-*',
      'main-bower-files',
      'nib',
      'streamqueue',
      'uglify-save-license',
      'wiredep',
      'yargs'
    ]
  })

  , buildConfig = require('../build.config.js')
  , appBase = buildConfig.appDir
  , appFontFiles = path.join(appBase, 'fonts/**/*')
  , appImages = path.join(appBase, 'images/**/*')
  , appMarkupFiles = path.join(appBase, '**/*.{haml,html,jade}')
  , appScriptFiles = path.join(appBase, '**/*.{ts,coffee,js}')
  , appStyleFiles = path.join(appBase, '**/*.{css,less,scss,styl}')

  , isProd = $.yargs.argv.stage === 'prod'
  , isDev = (!args.stage || $.yargs.argv.stage === 'dev')

  , tsProject = $.typescript.createProject({
    declarationFiles: true,
    noExternalResolve: false
  });

// delete build directory
gulp.task('clean', function (cb) {
  return $.del(buildConfig.buildDir, cb);
});

// compile markup files and copy into build directory
gulp.task('markup', ['clean'], function () {
  var hamlFilter = $.filter('**/*.haml')
    , jadeFilter = $.filter('**/*.jade');

  return gulp.src([
    appMarkupFiles
  ])
    .pipe(hamlFilter)
    .pipe($.haml())
    .pipe(hamlFilter.restore())
    .pipe(jadeFilter)
    .pipe($.jade())
    .pipe(jadeFilter.restore())
    .pipe(gulp.dest(buildConfig.buildDir));
});

// compile styles and copy into build directory
gulp.task('styles', ['clean'], function () {
  var lessFilter = $.filter('**/*.less')
    , scssFilter = $.filter('**/*.scss')
    , stylusFilter = $.filter('**/*.styl')
    , onError = function (err) {
      $.notify.onError({
        title: 'Error linting at ' + err.plugin,
        subtitle: ' ', //overrides defaults
        message: err.message.replace(/\u001b\[.*?m/g, ''),
        sound: ' ' //overrides defaults
      })(err);

      this.emit('end');
    };

  return gulp.src([
    appStyleFiles
  ])
    .pipe($.plumber({errorHandler: onError}))
    .pipe(lessFilter)
    .pipe($.less())
    .pipe(lessFilter.restore())
    .pipe(scssFilter)
    .pipe($.sass())
    .pipe(scssFilter.restore())
    .pipe(stylusFilter)
    .pipe($.stylus({
      use: $.nib()
    }))

    .pipe(stylusFilter.restore())
    .pipe($.autoprefixer())
    .pipe($.if(isProd, $.concat('app.css')))
    .pipe($.if(isProd, $.cssmin()))
    .pipe($.if(isProd, $.rev()))
	.pipe($.if(isProd,replace('../../images/flags.png', '../images/flags.png')))
    .pipe(gulp.dest(buildConfig.buildCss));
});

// compile scripts and copy into build directory
gulp.task('scripts', ['clean', 'analyze', 'markup'], function () {
   var typescriptFilter = $.filter('**/*.ts')
    , coffeeFilter = $.filter('**/*.coffee')
    , htmlFilter = $.filter('**/*.html')
    , jsFilter = $.filter('**/*.js');

  return gulp.src([
    appScriptFiles,
    buildConfig.buildDir + '**/*.html',
    '!**/*_test.*',
    '!**/index.html'
  ])
    .pipe(typescriptFilter)
    .pipe($.typescript(tsProject))
    .pipe(typescriptFilter.restore())
    .pipe(coffeeFilter)
    .pipe($.coffee())
    .pipe(coffeeFilter.restore())
    .pipe($.if(isProd, htmlFilter))
    //.pipe($.if(isProd, $.ngHtml2js({
    //  // lower camel case all app names
    //  moduleName: _.camelize(_.slugify(_.humanize(require('../package.json').name))),
    //  declareModule: false
    //})))
    .pipe($.if(isProd, htmlFilter.restore()))

    .pipe(jsFilter)
    .pipe($.if(isProd, $.angularFilesort()))
    //.pipe($.if(isProd, $.concat('app.js')))
    .pipe($.if(isProd, $.ngAnnotate()))
    .pipe($.if(isProd, $.uglify()))
   // .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildConfig.buildJs))
    .pipe(jsFilter.restore());
});

// inject custom CSS and JavaScript into index.html 
gulp.task('inject', ['constant'], function () {
  var jsFilter = $.filter('**/*.js');
  var conditionTexas = '**/texas/**/*Controller.js';
  var conditionDirctiveTexas = '**/texas/**/*Directive.js';  
  var conditionFlorida = '**/florida/**/*Controller.js';
  var conditionDirctiveFlorida = '**/florida/**/*Directive.js';
  
  return gulp.src(buildConfig.buildDir + 'index.html')
  
    .pipe($.inject(gulp.src([
      buildConfig.buildCss + '**/*',
      buildConfig.buildJs + '**/*'
    ])
    .pipe(jsFilter)
	.pipe(gulpIgnore.exclude(conditionTexas))
	.pipe(gulpIgnore.exclude(conditionDirctiveTexas))	
	.pipe(gulpIgnore.exclude(conditionFlorida))
	.pipe(gulpIgnore.exclude(conditionDirctiveFlorida))		
    .pipe($.angularFilesort())
    .pipe(jsFilter.restore()), {
      addRootSlash: false,
      ignorePath: buildConfig.buildDir
    }))
    .pipe(gulp.dest(buildConfig.buildDir));
});

// copy bower components into build directory
gulp.task('bowerCopy', ['inject'], function () {
  var cssFilter = $.filter('**/*.css')
    , jsFilter = $.filter('**/*.js')

    , stream = $.streamqueue({objectMode: true})
    , wiredep = $.wiredep({exclude: [/bootstrap[.]js/]});

  if (wiredep.js) {
    stream.queue(gulp.src(wiredep.js));
  }

  if (wiredep.css) {
    stream.queue(gulp.src(wiredep.css));
  }

  return stream.done()
    .pipe(cssFilter)
    //.pipe($.if(isProd, $.concat('vendor.css')))
    //.pipe($.if(isProd, $.cssmin()))
    //.pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildConfig.extCss))
    .pipe(cssFilter.restore())
    .pipe(jsFilter)
   // .pipe($.if(isProd, $.concat('vendor.js')))
    .pipe($.if(isProd, $.uglify({ preserveComments: $.uglifySaveLicense })))
   // .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildConfig.extJs))
    .pipe(jsFilter.restore());
});

// inject bower components into index.html
gulp.task('bowerInject', ['bowerCopy'], function () {
 // if (isProd) {
 //   return gulp.src(buildConfig.buildDir + 'index.html')
  //    .pipe($.inject(gulp.src([
    //    buildConfig.extCss + '**/*.css',
   //     buildConfig.extJs + '**/*.js'
    //  ], {
    //    read: false
      //}), {
        //starttag: '<!-- bower:{{ext}} -->',
        //endtag: '<!-- endbower -->',
        //addRootSlash: false,
        //ignorePath: buildConfig.buildDir
      //}))
      //------- .pipe($.htmlmin({
        // -------collapseWhitespace: true,
        // -------removeComments: true
      // -------}))
      //.pipe(gulp.dest(buildConfig.buildDir));
  //} else { 
    return gulp.src(buildConfig.buildDir + 'index.html')
      .pipe($.wiredep.stream({
        exclude: [/bootstrap[.]js/],
        fileTypes: {
          html: {
            replace: {
              css: function (filePath) {
                return '<link rel="stylesheet" href="' + buildConfig.extCss.replace(buildConfig.buildDir, '') +
                  filePath.split('/').pop() + '">';
              },
              js: function (filePath) {			  
                return '<script src="' + buildConfig.extJs.replace(buildConfig.buildDir, '') +
                  filePath.split('/').pop() + '"></script>';
              }
            }
          }
        }
      }))
      .pipe(gulp.dest(buildConfig.buildDir));
 // }
});

// copy custom fonts into build directory
gulp.task('fonts', ['fontsBower'], function () {
  var fontFilter = $.filter('**/*.{eot,otf,svg,ttf,woff}');
  return gulp.src([appFontFiles])
    .pipe(fontFilter)
    .pipe(gulp.dest(buildConfig.buildFonts))
    .pipe(fontFilter.restore());
});
// copy Bower fonts into build directory
gulp.task('fontsBower', ['clean'], function () {
  var fontFilter = $.filter('**/*.{eot,otf,svg,ttf,woff}');
  return gulp.src($.mainBowerFiles())
    .pipe(fontFilter)
    .pipe(gulp.dest(buildConfig.extFonts))
    .pipe(fontFilter.restore());
});

// copy and optimize images into build directory
gulp.task('images', ['clean'], function () {
  return gulp.src(appImages)
    .pipe($.if(isProd, $.imagemin()))
    .pipe(gulp.dest(buildConfig.buildImages));
});




gulp.task('deleteTemplates', ['bowerInject'], function (cb) {
  // only delete templates in production
  // the templates are injected into the app during prod build
  if (!isProd) {
    return cb();
  }

  // gulp.src([buildConfig.buildDir + '**/*.html'])
    // .pipe(gulp.dest('tmp/' + buildConfig.buildDir))
    // .on('end', function () {
      // $.del([
        // buildConfig.buildDir + '*',
        // '!' + buildConfig.buildCss,
        // '!' + buildConfig.buildFonts,
        // '!' + buildConfig.buildImages,
        // '!' + buildConfig.buildJs,
        // '!' + buildConfig.extDir,
        // '!' + buildConfig.buildDir + 'index.html'
      // ], {mark: true}, cb);
    // });
});

gulp.task('copyDocuments', ['clean'], function () {
    if (isDev) {
        return gulp.src('../Weston.Documents/**/*')
        .pipe(gulp.dest(buildConfig.buildDir));
    }
    return;
});

gulp.task('build', ['copyDocuments', 'deleteTemplates', 'bower', 'images', 'fonts']);

gulp.task('bower', function () {
    return bower()
      .pipe(gulp.dest('bower_components/'))
});

gulp.task('constant',['markup', 'styles', 'scripts'], function () {
    var selectedConstant = args.stage || 'dev'; // if --env is not declared, assume dev
    var constants = {
        dev: {
            envConfig: {
                'apiUrl': 'http://localhost/WAP-Development/WestonWebApi/',
				'agencyLinkUrl': 'https://wesvqatwa.csc-fsg.com/AgencyLinkC.0/AuthenticateUser.aspx'
            }
        },
        prod: {
            envConfig: {
                'apiUrl': 'https://Breeze.weston-ins.com/WestonWebApi/',
                'agencyLinkUrl': 'https://westonal.csc-fsg.com/AgencyLinkC.0/authenticateuser.aspx'
                }
        },
        stage: {
            envConfig: {
                'apiUrl': 'http://wi-dev-app-01/BreezeQaInt/WestonWebApi/',
				'agencyLinkUrl': 'https://wesvstgwa.csc-fsg.com/AgencyLinkC.0/AuthenticateUser.aspx'
            }
        },
        qa: {
            envConfig: {
                'apiUrl': 'http://wi-dev-sql-01/breezeQA/WestonWebApi/',
				'agencyLinkUrl': 'https://wesvqatwa.csc-fsg.com/AgencyLinkC.0/AuthenticateUser.aspx'
            }
        },
		uat: {
            envConfig: {
                'apiUrl': 'http://qa.weston-ins.com/BreezeQA/WestonWebApi/',
				'agencyLinkUrl': 'https://wesvstgwa.csc-fsg.com/AgencyLinkC.0/AuthenticateUser.aspx'
            }
        }
    }

    return ngConstant({
        name: 'common.envConfigConstant', // name of your module
        constants: constants[selectedConstant],
        stream: true
    })
    .pipe(gulp.dest(buildConfig.buildENVConfigConstant));
});

