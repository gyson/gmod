
# gmod

Generator-based Module System

* use `yield` to import module
* use `throw` to throw error
* use `return` to export module

## Installation

```
$ npm install gmod
```

## Usage
In `foo.js`:

```js
var foo = "Hi, I am foo."
return foo; // export foo
```

In `bar.js`:

```js
var foo = yield './foo.js'; // import from `foo.js`

console.log(foo);

return "Hi, I am bar";
```

In `main.js` (regular node.js file):

```
var gmod = require('gmod');

// import will return a Promise instance
gmod.import(__dirname + '/bar.js')
    .then(function (bar) {
        console.log("bar:", bar);
    }, function (err) {
        console.log("err:", err);
    });
```

