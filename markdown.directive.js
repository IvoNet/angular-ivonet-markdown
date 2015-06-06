/*
 * Copyright 2015 Ivo Woltring <Webmaster@ivonet.nl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @ngdoc directive
 * @restrict A
 * @name ivoMarkdown.directive:ivoMarkdown
 * @author: ivo Woltring
 * @description
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

