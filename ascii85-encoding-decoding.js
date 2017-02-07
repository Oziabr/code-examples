// 2kyu
// https://www.codewars.com/kata/5277dc3ff4bfbd9a36000c1c

String.prototype.toAscii85 = function() {
  var str = this, result = ''
  while (str.length) {
    let num = 0, j = 5, i = 4
    if (str.substr(0,4) == '\u0000\u0000\u0000\u0000') result += 'z'
    else {
      while (i--) {
        num += (str.charCodeAt(3-i) || 0)*Math.pow(2, 8*i)
      }
      while (j-- && str.length > 3-j) {
        result += String.fromCharCode(num/Math.pow(85, j) % 85 + 33)
      }
    }
    str = str.substr(4)
  }
  return `<~${result}~>`
}

String.prototype.fromAscii85 = function() {
  var str = this.slice(2, -2).replace(/\s/g, ''), result = ''
  while (str.length) {
    if (str[0] == 'z') {
      result += '\u0000\u0000\u0000\u0000'
      str = str.substr(1)
    } else {
      let num = 0, j = 5, i = 4
      while (j--) {
        num += (((str.charCodeAt(4-j) || 117)-33)*Math.pow(85, j)) || 0
      }
      while (i-- && str.length > 4-i) {
        result += String.fromCharCode((num/Math.pow(2, 8*i))%256)
      }
      str = str.substr(5)
    }
  }
  return result
}
