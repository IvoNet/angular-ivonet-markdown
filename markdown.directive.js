/**
 * @ngdoc directive
 * @restrict A
 * @name ivoMarkdown.directive:ivoMarkdown
 * @author: ivo Woltring
 * @description
 * Installation:
 * bower install showdown --save
 * bower install showdown-table --save
 * bower install showdown-prettify --save
 * bower install showdown-github --save
 * bower install showdown-twitter --save
 * bower install showdown-target-blank --save
 * bower install angular-sanitize --save
 * bower install highlightjs --save
 * Add 'ivoMarkdown' to your angular module dependencies
 * your html needs something like this:
 <pre>
 <div ivo-markdown="markdown"></div>
 <textarea ng-model="markdown"></textarea>
 </pre>
 */
(function () {
   angular.module('ivoMarkdown', [
      'ngSanitize',
      'hljs'
   ]).provider('ivoMarkdownConfig', [
      'hljsServiceProvider',
      function (hljsServiceProvider) {
         var showdownOpts = {};
         var hljsOpts = {tabReplace: '    '};
         return {
            config: function (options) {
               showdownOpts = options;
            },
            hljsOptions: function (options) {
               hljsOpts = options;
            },
            $get: function () {
               hljsServiceProvider.setOptions(hljsOpts);
               return new Showdown.converter(showdownOpts);
            }
         };
      }
   ]).directive('ivoMarkdown', [
      '$sanitize',
      'ivoMarkdownConfig',
      'hljsService',
      function ($sanitize, ivoMarkdownConfig, hljsService) {
         return {
            restrict: 'AE',
            link: function (scope, element, attrs) {

               function highlight() {
                  angular.forEach(element[0].querySelectorAll('pre code'), function (value) {
                     $sanitize(hljsService.highlightBlock(value));
                  });
               }

               if (attrs.ivoMarkdown) {
                  scope.$watch(attrs.ivoMarkdown, function (value) {
                     element.html(value ? $sanitize(ivoMarkdownConfig.makeHtml(value)) : '');
                     highlight();
                  });
               } else {
                  element.html($sanitize(ivoMarkdownConfig.makeHtml(element.text())));
                  highlight()
               }
            }
         };
      }
   ]);
})();
