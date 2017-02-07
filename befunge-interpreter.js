// 2kyu
// https://www.codewars.com/kata/526c7b931666d07889000a3c

function interpret(code) {
  var output = "";
  var stack = []
  var dir = '>'
  var done, string
  var ptr = [0, 0]
  
  var move = () => ({
    '<': () => ptr[0] += ptr[0] ? -1 : code[ptr[1]].length
  , '>': () => ptr[0] += ptr[0] != code[ptr[1]].length ? 1 : -code[ptr[1]].length
  , '^': () => ptr[1] += ptr[1] ? -1 : code.length
  , 'v': () => ptr[1] += ptr[1] != code.length ? 1 : -code.length
  }[dir])()

  var ops = {
    '0123456789': (_) => stack.push(_)
  , '+': (a, b) => stack.push(a+b)
  , '-': (a, b) => stack.push(b-a)
  , '*': (a, b) => stack.push(a*b)
  , '/': (a, b) => stack.push(a ? b/a : 0)
  , '%': (a, b) => stack.push(a ? b%a : 0)
  , '!': (a) => stack.push(a ? 0 : 1)
  , '`': (a, b) => stack.push(b>a ? 1 : 0)
  , '><^v': (_) => dir = _
  , '?': () => dir = '><^v'[parseInt(Math.random()*4)]
  , '_': (a) => dir = a ? '<' : '>'
  , '|': (a) => dir = a ? '^' : 'v'
  , '"': () => string = !string
  , ':': () => stack[stack.length] = stack[stack.length-1] || 0
  ,'\\': (a, b) => stack = stack.concat([a, b || 0])
  , '$': (a) => 0
  , '.': (a) => output += a
  , ',': (a) => output += String.fromCharCode(a)
  , '#': () => move()
  , 'p': (y, x, v) => code[y] = code[y].slice(0, x) + String.fromCharCode(v) + code[y].slice(x+1)
  , 'g': (y, x) => stack.push(code[y][x].charCodeAt(0))
  , '@': () => done = true
  , ' ': () => 0
  }
  
  code = code.split("\n")
  
  while (!done) {
    let op = code[ptr[1]][ptr[0]]
    if (string && op != '"') {
      stack.push(op.charCodeAt(0))
    } else {
      let fn = ops[Object.keys(ops).find(d => d.includes(op))]
      let args = fn.toString().match(/^\([^)]*/)[0].slice(1).split(/,\s/).filter(a => a).map(a => a == '_' ? op : parseInt(stack.pop()))
      fn(...args)
      if (op == 'p') console.log('post', op, args, code)
    }
    move()
  }
  
  return output;
}