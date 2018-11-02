![](https://i.imgur.com/MvMTdgF.png)

# sqrup

Surround text with a rectangle to make it stand out.

## Install

`npm i sqrup`

## Import

`const sqrup = require('sqrup');`

## API

Function signature:
```js
function sqrup(text, options)
````

With TypeScript types:
```typescript
function sqrup(text: string | string[], options: string | sqrup.SquareUpOptions): string
```

```typescript
type SquareUpOptions = {
  default?: string;
  // Sides
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  // Corners
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  // Pad
  padLeft?: number;
  padRight?: number;
  padBottom?: number;
  padTop?: number;
}
```

Or you can just take a look at the `sqrup.d.ts` file.

## Examples

### 1. Simple use case
```js
console.log( sqrup('Hello,\nworld!') );
```

```
************
*  Hello,  *
*  world!  *
************
```

### 2. Use custom character
(Instead of the default asterisk `*`)

```js
console.log(sqrup('One,\nTwo,\nThree.', 'x'));
```
```
xxxxxxxxxxxx
x  One,    x
x  Two,    x
x  Three.  x
xxxxxxxxxxxx
```

### 3. Control the padding between the text and the square
```js
console.log(sqrup('WELCOME\n HOME', {
                   // defaults:
    default: 'o',  // '*'
    padLeft: 8,    // 1
    padRight: 8,   // 2
    padTop: 2,     // 0
    padBottom: 2,  // 0
}));
```
```
ooooooooooooooooooooooooo
o                       o
o                       o
o        WELCOME        o
o         HOME          o
o                       o
o                       o
ooooooooooooooooooooooooo
```

### 4. Fine grained customization

```js
console.log(sqrup('Look Ma,\n I\'m in a box!', {
  // default:  ...,
  // The `default` option does nothing in this specific scenario
  // since all of the edge charactrers are specified individually
  // in the options at the bottom.

  // Pad
  padLeft: 8,
  padRight: 2,
  padBottom: 0,
  padTop: 2,

  // All of the following options use the character specifeid
  // in the `defeault` if not given any value:

  // Sides
  left: '▶',
  right: '◀',
  top: '▼',
  bottom: '▲',
  // Corners
  topLeft: '◢',
  topRight: '◣',
  bottomLeft: '◥',
  bottomRight: '◤',
}));
```

```
◢▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼◣
▶                        ◀
▶                        ◀
▶        Look Ma,        ◀
▶         I'm in a box!  ◀
◥▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲◤
```

## Defaults

```typescript
type SquareUpOptions = {
  default?: string;      // '*'

  // Pad
  padLeft?: number;      // 2
  padRight?: number;     // 2
  padBottom?: number;    // 0
  padTop?: number;       // 0

  // The following 8 options will all use the value of the `default`
  // option if they are not explicitly specified.

  // Sides
  left?: string;         // use `default`
  right?: string;        // use `default`
  top?: string;          // use `default`
  bottom?: string;       // use `default`
  // Corners
  topLeft?: string;      // use `default`
  topRight?: string;     // use `default`
  bottomLeft?: string;   // use `default`
  bottomRight?: string;  // use `default`
}
```

## Extra - How to produce the image at the top

```js
sqrup('\u001b[32msqrup\u001b[39m', {
  default: '\u001b[33m*\u001b[39m',
  // Sides
  left: '\u001b[33m⁑\u001b[39m',
  right: '\u001b[33m⁑\u001b[39m',
  // Pad
  padLeft: 6,
  padRight: 6,
  padBottom: 2,
  padTop: 2,
})
```

![](https://i.imgur.com/MvMTdgF.png)

## License

[ISC](https://opensource.org/licenses/ISC)
