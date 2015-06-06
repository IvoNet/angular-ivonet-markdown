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

describe('ivoMarkdown basic usage tests', function () {
   "use strict";

   var $compile,
       $rootScope;

   beforeEach(module('ngSanitize'));
   beforeEach(module('hljs'));
   beforeEach(module('ivoMarkdown'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
   }));


   it('should works as an attribute', function () {
      var element = angular.element('<div ivo-markdown># header</div>');
      $compile(element)($rootScope);
      expect(element.html()).toBe('<h1>header</h1>');
   });


   it('should work as an element', function () {
      var element = angular.element('<ivo-markdown>**bold**</ivo-markdown>');
      $compile(element)($rootScope);
      expect(element.html()).toBe('<p><strong>bold</strong></p>');
   });


   it('should not create tables from markdown tables', function () {
      var element = angular.element("<ivo-markdown>|Markdown | Less | Pretty |\n|---: | --: | ---: |\n|1 | 2 | 3|\n</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<p>|Markdown | Less | Pretty |\n|---: | --: | ---: |\n|1 | 2 | 3|</p>");

   });

   it('should watch the scope markdown variable and change accordingly', function () {
      var element = angular.element('<div ivo-markdown="markdown"></div>');
      $rootScope.markdown = "# header";
      $compile(element)($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe('<h1>header</h1>');
      $rootScope.markdown = "*bold*";
      $rootScope.$digest();
      expect(element.html()).toBe('<p><em>bold</em></p>');
   });

});


describe('ivoMarkdownConverter with extensions: table', function () {
   var $compile,
       $rootScope;

   angular.module('testModuleTable', []).config(function (ivoMarkdownConfigProvider) {
      ivoMarkdownConfigProvider.config({extensions: ['table']})
   });

   beforeEach(module('ngSanitize'));
   beforeEach(module('hljs'));
   beforeEach(module('ivoMarkdown'));
   beforeEach(module('testModuleTable'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
   }));

   it('should now create html tables from markdown tables', function () {
      var element = angular.element("<ivo-markdown>|Markdown|Less|Pretty|\n|---:| --:| ---:|\n|1|2|3|\n</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<table>\n<thead>\n<tr>\n<th>Markdown</th>\n<th>Less</th>\n<th>Pretty</th>\n</tr>\n</thead>\n\n<tbody>\n<tr>\n<td><p>1</p></td>\n<td><p>2</p></td>\n<td><p>3</p></td>\n</tr>\n\n</tbody>\n</table>");
   })
});

describe('ivoMarkdownConverter with extensions: twitter', function () {

   var $compile,
       $rootScope;

   angular.module('testModuleTwitter', []).config(function (ivoMarkdownConfigProvider) {
      ivoMarkdownConfigProvider.config({
         extensions: [
            'twitter'
         ]
      })
   });

   beforeEach(module('ngSanitize'));
   beforeEach(module('hljs'));
   beforeEach(module('ivoMarkdown'));
   beforeEach(module('testModuleTwitter'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
   }));


   it('should now create twitter links', function () {
      var element = angular.element("<ivo-markdown>@ivonet</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<p><a href=\"http://twitter.com/ivonet\">@ivonet</a></p>");
   })
});

describe('ivoMarkdownConverter with extensions: twitter, targetblank', function () {
   var $compile,
       $rootScope;

   angular.module('testModuleTwitterTargetBlank', []).config(function (ivoMarkdownConfigProvider) {
      ivoMarkdownConfigProvider.config({
         extensions: [
            'twitter',
            'targetblank'
         ]
      })
   });

   beforeEach(module('ngSanitize'));
   beforeEach(module('hljs'));
   beforeEach(module('ivoMarkdown'));
   beforeEach(module('testModuleTwitterTargetBlank'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
   }));


   it('should now create twitter links with a target="_blank" attribute', function () {
      var element = angular.element("<ivo-markdown>@ivonet</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<p><a target=\"_blank\" href=\"http://twitter.com/ivonet\">@ivonet</a></p>");
   });

   it('should now not show deleted text because the github extension is not installed in this test', function () {
      var element = angular.element("<ivo-markdown>~~deleted tekst~~</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<p>~~deleted tekst~~</p>");
   });

});


describe('ivoMarkdownConverter with extensions: github', function () {
   var $compile,
       $rootScope;

   angular.module('testModuleGithub', []).config(function (ivoMarkdownConfigProvider) {
      ivoMarkdownConfigProvider.config({extensions: ['github']})
   });

   beforeEach(module('ngSanitize'));
   beforeEach(module('hljs'));
   beforeEach(module('ivoMarkdown'));
   beforeEach(module('testModuleGithub'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
   }));

   it('should now not create a twitter link because the twitter extension is not installed in this test', function () {
      var element = angular.element("<ivo-markdown>@ivonet</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<p>@ivonet</p>");
   });

   it('should now show deleted text', function () {
      var element = angular.element("<ivo-markdown>~~deleted tekst~~</ivo-markdown>");
      $compile(element)($rootScope);
      //console.log(element.html());
      expect(element.html()).toBe("<p><del>deleted tekst</del></p>");
   })
});


describe('ivoMarkdownConverter default code formatting', function () {
   "use strict";

   var $compile,
       $rootScope;

   beforeEach(module('ngSanitize'));
   beforeEach(module('hljs'));
   beforeEach(module('ivoMarkdown'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
   }));

   it('should highlight python code', function () {
      var element = angular.element("<ivo-markdown>```python\n\nimport IvoNet\n\ndef hello():\n    print 'hello world'\n```</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<pre><code class=\"python hljs\"><span class=\"hljs-keyword\">import</span> IvoNet\n\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">def</span> <span class=\"hljs-title\">hello</span><span class=\"hljs-params\">()</span>:</span>\n    <span class=\"hljs-keyword\">print</span> <span class=\"hljs-string\">\'hello world\'</span>\n</code></pre>");
   });

   it('should highlight python code and by default replace tabs by 4 spaces', function () {
      var element = angular.element("<ivo-markdown>```python\n\nimport IvoNet\n\ndef hello():\n\tprint 'hello world'\n```</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<pre><code class=\"python hljs\"><span class=\"hljs-keyword\">import</span> IvoNet\n\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">def</span> <span class=\"hljs-title\">hello</span><span class=\"hljs-params\">()</span>:</span>\n    <span class=\"hljs-keyword\">print</span> <span class=\"hljs-string\">\'hello world\'</span>\n</code></pre>");
   });

   it('should highlight java code', function () {
      var element = angular.element("<ivo-markdown>```java\npackage nl.ivonet.application;\npublic class Foo {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello World\");\n\t}\n}\n```</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<pre><code class=\"java hljs\"><span class=\"hljs-keyword\">package</span> nl.ivonet.application;\n<span class=\"hljs-keyword\">public</span> <span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span> <span class=\"hljs-title\">Foo</span> </span>{\n    <span class=\"hljs-function\"><span class=\"hljs-keyword\">public</span> <span class=\"hljs-keyword\">static</span> <span class=\"hljs-keyword\">void</span> <span class=\"hljs-title\">main</span><span class=\"hljs-params\">(String[] args)</span> </span>{\n        System.out.println(<span class=\"hljs-string\">\"Hello World\"</span>);\n    }\n}\n</code></pre>");
   });

});

describe('ivoMarkdownConverter adjusted code formatting', function () {
   "use strict";

   var $compile,
       $rootScope;

   angular.module('testModuleCodeFormatingOptions', []).config(function (ivoMarkdownConfigProvider) {
      ivoMarkdownConfigProvider.hljsOptions({classPrefix: 'YOLO-hljs-', tabreplace: '    '})
   });

   beforeEach(module('ngSanitize'));
   beforeEach(module('hljs'));
   beforeEach(module('ivoMarkdown'));
   beforeEach(module('testModuleCodeFormatingOptions'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
   }));

   it('should highlight python code', function () {
      var element = angular.element("<ivo-markdown>```python\n\nimport IvoNet\n\ndef hello():\n    print 'hello world'\n```</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<pre><code class=\"python hljs\"><span class=\"YOLO-hljs-keyword\">import</span> IvoNet\n\n<span class=\"YOLO-hljs-function\"><span class=\"YOLO-hljs-keyword\">def</span> <span class=\"YOLO-hljs-title\">hello</span><span class=\"YOLO-hljs-params\">()</span>:</span>\n    <span class=\"YOLO-hljs-keyword\">print</span> <span class=\"YOLO-hljs-string\">\'hello world\'</span>\n</code></pre>");
   });

   it('should highlight python code and by default replace tabs by 4 spaces', function () {
      var element = angular.element("<ivo-markdown>```python\n\nimport IvoNet\n\ndef hello():\n\tprint 'hello world'\n```</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<pre><code class=\"python hljs\"><span class=\"YOLO-hljs-keyword\">import</span> IvoNet\n\n<span class=\"YOLO-hljs-function\"><span class=\"YOLO-hljs-keyword\">def</span> <span class=\"YOLO-hljs-title\">hello</span><span class=\"YOLO-hljs-params\">()</span>:</span>\n    <span class=\"YOLO-hljs-keyword\">print</span> <span class=\"YOLO-hljs-string\">\'hello world\'</span>\n</code></pre>");
   });

   it('should highlight java code', function () {
      var element = angular.element("<ivo-markdown>```java\npackage nl.ivonet.application;\npublic class Foo {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello World\");\n\t}\n}\n```</ivo-markdown>");
      $compile(element)($rootScope);
      expect(element.html()).toBe("<pre><code class=\"java hljs\"><span class=\"YOLO-hljs-keyword\">package</span> nl.ivonet.application;\n<span class=\"YOLO-hljs-keyword\">public</span> <span class=\"YOLO-hljs-class\"><span class=\"YOLO-hljs-keyword\">class</span> <span class=\"YOLO-hljs-title\">Foo</span> </span>{\n    <span class=\"YOLO-hljs-function\"><span class=\"YOLO-hljs-keyword\">public</span> <span class=\"YOLO-hljs-keyword\">static</span> <span class=\"YOLO-hljs-keyword\">void</span> <span class=\"YOLO-hljs-title\">main</span><span class=\"YOLO-hljs-params\">(String[] args)</span> </span>{\n        System.out.println(<span class=\"YOLO-hljs-string\">\"Hello World\"</span>);\n    }\n}\n</code></pre>");
   });

});