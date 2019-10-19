"use strict"

module.exports = function (insults) {

  if (!insults || !(insults instanceof Array)) {
    throw 'You should provid an array of insults.'
  }

  function makeRegExp(insult) {
    return new RegExp('(?<![a-z0-9])' + insult + '(?![a-z0-9])', 'i')
  }

  function contains(str) {
    for (var i = 0; i < insults.length; i++) {
      if (makeRegExp(insults[i]).test(str)) return true
    }
    return false
  }

  function replace(str, replacement) {
    for (var i = 0; i < insults.length; i++) {
      var regExp = makeRegExp(insults[i])
      if (regExp.test(str)) {
        var match
        while (match = regExp.exec(str)) {
          str = (
            str.substr(0, match.index) +
            Array(match[0].length + 1).join(replacement || '*') +
            str.substr(match.index + match[0].length, str.length)
          )
        }
      }
    }
    return str
  }

  return {
    contains,
    replace,
  }
}
