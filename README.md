## Detect insults in a string [![Build Status](https://travis-ci.org/graphcomment/filter-insults.svg?branch=master)](https://travis-ci.org/graphcomment/filter-insults)

Warning: you need to provide your own insults list, you can get one here:

- https://github.com/zacanger/profane-words
- https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words
- https://github.com/MauriceButler/badwords

```js
var FilterInsults = require('filter-insults');
var filter = new FilterInsults(['stupid', 'uncool']);

filter.contains('that is uncool'); // true
filter.contains('that is cool'); // false

filter.replace('that is uncool'); // 'that is ******'
filter.contains('that is uncool', 'X'); // 'that is XXXXXX'
```
