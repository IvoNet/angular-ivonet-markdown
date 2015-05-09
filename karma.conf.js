// Karma configuration
// Generated on Sat May 09 2015 00:52:08 GMT+0200 (CEST)

module.exports = function (config) {
   config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],


      // list of files / patterns to load in the browser
      files: [
         'bower_components/angular/angular.js',
         'bower_components/angular-sanitize/angular-sanitize.js',
         'bower_components/angular-mocks/angular-mocks.js',
         'bower_components/showdown/src/showdown.js',
         'bower_components/showdown/src/extensions/*.js',
         'bower_components/highlightjs/highlight.pack.js',
         'bower_components/angular-highlightjs/angular-highlightjs.js',
         'bower_components/showdown-target-blank/dist/showdown-target-blank.js',
         'bower_components/showdown-github/dist/showdown-github.js',
         'bower_components/showdown-table/dist/showdown-table.js',
         'bower_components/showdown-prettify/dist/showdown-prettify.js',
         'bower_components/showdown-twitter/dist/showdown-twitter.js',
         'markdown.directive.js',
         '*.spec.js'
      ],

      // list of files to exclude
      exclude: [],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {},


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress'],


      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'],


      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false
   });
};
