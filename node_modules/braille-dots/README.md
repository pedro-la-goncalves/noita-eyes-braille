# braille-dots

[![Build Status](https://travis-ci.com/reergymerej/braille-dots.svg?token=AiAzfY2MJmZkDBAp517s&branch=master)](https://travis-ci.com/reergymerej/braille-dots)

Get Braille characters based on the dot-names or vice versa.

```js
import brailleDots from 'braille-dots'

brailleDots(234) // '⠎'
brailleDots('⠎') // 234

brailleDots(null) // '⠀'
brailleDots('⠀') // null
```


Values are based off the super convenient
https://www.pharmabraille.com/braille-codes/unified-english-braille-ueb-code/.







---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
