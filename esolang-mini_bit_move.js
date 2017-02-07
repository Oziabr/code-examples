// 6kyu
// https://www.codewars.com/kata/587c0138110b20624e000253

function interpreter(tape, array) {
  var pos = 0
  while (pos < array.length) {
    if (+tape[0]) array = array.slice(0, pos) + (+array[pos] ? 0 : 1) + array.slice(pos+1)
    else pos++
    tape = tape.substr(1) + tape[0]
  }
  return array
}
