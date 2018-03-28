"use strict"

module.exports = function (insults) {

  if (!insults || !(insults instanceof Array)) {
    throw 'You should provided an array of insults the first argument'
  }

  function makeRegExp(insult) {
    return new RegExp('[^a-zA-Z0-9]?' + insult + '(?![a-zA-Z0-9])', 'i')
  }

  function contains(str) {
    for (var i = 0; i < insults.length; i++) {
      if (makeRegExp(insults[i]).test(str)) return true
    }
    return false
  }

  function replace(str, replacement = '*') {
    for (var i = 0; i < insults.length; i++) {
      var regExp = makeRegExp(insults[i]);
      if (regExp.test(str)) {
        var match
        while (match = regExp.exec(str)) {
          str = (
            str.substr(0, match.index + 1) +
            Array(match[0].length).join(replacement) +
            str.substr(match.index + match[0].length, str.length)
          )
        }
      }
    }
    return str;
  }

  return {
    contains,
    replace,
  }
}
