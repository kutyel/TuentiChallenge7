/**
 *
 * This function takes an UTF16 encoded string as input,
 * and returns it but with all the digits from Unicode
 * class 'Nd' (Number, Decimal Digit) replaced with their
 * equivalent ASCII digit.
 * Source : http://stackoverflow.com/a/12171250/36866
 * License: Public domain
 * Author : some@domain.name
 * Note   : If you are going to use this code I would appreciate to get an email.
 * You don't have to but it would make me happier!
 */
module.exports = (function () {
  var reUTF16Nd =
    // Regexp to match UTF16 encoded: Number, Decimal Digit
    new RegExp(
      [
        '(',
        // Ranges with offset 0
        '[',
        '\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0E50-\u0E59',
        '\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099',
        '\u17E0-\u17E9\u1810-\u1819\u19D0-\u19D9\u1A80-\u1A89',
        '\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49',
        '\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909',
        '\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19',
        ']',
        '|\uD841[\uDCA0-\uDCA9]',
        '|\uD844[\uDCF0-\uDCF9\uDDD0-\uDDD9]',
        '|\uD845[\uDEC0-\uDEC9]',
        ')|(',
        // Ranges with offset 6 (and math)
        '[',
        '\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF',
        '\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF',
        '\u0D66-\u0D6F\u1946-\u194F',
        ']',
        '|\uD844[\uDC66-\uDC6F\uDD36-\uDD3F]',
        '|\uD875[\uDFCE-\uDFFF]', // Math
        ')'
      ].join(''),
      'g'
    )
  return function (input) {
    return input.replace(
      reUTF16Nd,
      function (a, b, c) {
        var value = a.charCodeAt(a.length - 1)
        var offset = b ? 0 : a[0] === '\uD875' ? (value -= 0xD876, value %= 10, 0) : -6
        return String.fromCharCode(48 + (offset + value & 15))
      }
    )
  }
})()
