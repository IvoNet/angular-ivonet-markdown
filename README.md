# angular-ivonet-markdown

A markdown directive for AngularJS (1.x). 

## Features

See for an demo this [plunker](http://plnkr.co/edit/SCPkcZjRCghoavJpRJij?p=preview) or the example in this project.

## Build the project

```sh
bower install
```

Start hacking...

## Mandatory Dependencies

```sh
bower install highlightjs --save
bower install angular-highlightjs --save
bower install showdown --save
bower install angular-sanitize --save
```

## Optional dependencies

The following dependencies are possible extensions to the standard markdown.
Please look at the corresponding project documentation on how to use them.

```sh
bower install showdown-github --save
bower install showdown-table --save
bower install showdown-prettify --save
bower install showdown-github --save
bower install showdown-twitter --save
bower install showdown-target-blank --save
```

I have included some of these in my example.


## Code Snippets

Sample Angular module with the ivoMarkdown module injected and with some 
extensions configured in the provider of the directive
```js
(function () {
    angular.module('MarkdownExampleApp', ['ivoMarkdown'])
    .config(function (ivoMarkdownConfigProvider) {
        ivoMarkdownConfigProvider.config({extensions: ['github', 'table']})
    })
    .controller('MarkdownController', MarkdownController);
    function MarkdownController() {
        this.markdown = "**Hello World**";
    }
})();
```

Html controller and usage of the directive:

```html
<ivo-markdown># Hello World</ivo-markdown>

<div ng-controller="MarkdownController as mm">
    <textarea ng-model="mm.markdown"></textarea>
    <div ivo-markdown="mm.markdown"></div>
</div>

```

## License

[MIT](MIT-LICENSE.txt)

## Acknowledgements
 
This directive is based on [btford's](https://github.com/btford/angular-markdown-directive) directive.
Thanks for the idea I hope I improved on it.

