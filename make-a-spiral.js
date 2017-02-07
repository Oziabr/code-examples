// 3kyu
// https://www.codewars.com/kata/534e01fbbb17187c7e0000c6

var spiralize = function(size) {
  var fill = () => Array(size).fill(0)
  var result = fill().map(() => fill())
  var ptr = size

  while (ptr > size/2) {
    let top = ptr-1, bottom = size-ptr
    result = result.map((a, i) => {
      if (i == bottom || i == top) a = a.map((e, j) => j < size-ptr || j > ptr-1 ? e : 1)
      a = a.map((e, j) => (i > bottom && i < top) && (j == bottom || j == top) ? 1 : e)
      return a
    })
    if (top - bottom > 0) result[bottom+1] = result[bottom+1].map((e, i) => i == bottom ? 0 : e)
    if (top - bottom > 3) result[bottom+2] = result[bottom+2].map((e, i) => i == bottom+1 ? 1 : e)
    ptr -= 2
  }

  return result
}