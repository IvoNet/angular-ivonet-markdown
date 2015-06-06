# angular-ivonet-markdown

A markdown directive for AngularJS (1.x). 

## Features

See for an demo this [plunker](http://plnkr.co/edit/SCPkcZjRCghoavJpRJij?p=preview) or the example in this project.

## Install

install:

```sh
bower install angular-ivonet-markdown
```

add to your html:

```html
<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="bower_components/highlightjs/highlight.pack.js"></script>
<script src="bower_components/angular-highlightjs/build/angular-highlightjs.js"></script>
<script src="bower_components/showdown/src/showdown.js"></script>
<script src="bower_components/angular-ivonet-markdown/markdown.directive.js"></script>
```

if you installed the optional dependencies than don't forget to add them to the html:

```html
<script src="bower_components/showdown-twitter/dist/showdown-twitter.js"></script>
<script src="bower_components/showdown-table/dist/showdown-table.js"></script>
<script src="bower_components/showdown-github/dist/showdown-github.js"></script>
<script src="bower_components/showdown-prettify/dist/showdown-prettify.js"></script>
<script src="bower_components/showdown-target-blank/dist/showdown-target-blank.js"></script>
```

Start hacking...

## Configuration

Please look at the unit tests for examples.

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


## License

[MIT](MIT-LICENSE.txt)

## Acknowledgements
 
This directive is based on [btford's](https://github.com/btford/angular-markdown-directive) directive.
Thanks for the idea I hope I improved on it.


## TODO

* Add minification and dist job