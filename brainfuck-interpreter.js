// 2kyu
// https://www.codewars.com/kata/526156943dfe7ce06200063e

function brainLuck(code, input){
  var cp = 0, dp = 0, data = [], output = '', bc;
  var op = {
    ',': () => { data[dp] = input.charCodeAt(0) || 0; input = input.slice(1); }
   ,'.': () => output += String.fromCharCode(data[dp])
   ,'>': () => dp++
   ,'<': () => dp--
   ,'+': () => { data[dp] = data[dp] || 0; data[dp] = data[dp] == 255 ? 0 : data[dp]+1 }
   ,'-': () => { data[dp] = data[dp] || 0; data[dp] = data[dp] == 0 ? 255 : data[dp]-1 }
   ,'[': () => { if (data[dp]) return; let p, bc = 0; while (code[++cp] != ']' || bc) bc += ~(p ='] ['.indexOf(code[cp])) ? p-1 : 0 }
   ,']': () => { if (!data[dp]) return; let p, bc = 0; while (code[--cp] != '[' || bc) bc += ~(p ='[ ]'.indexOf(code[cp])) ? p-1 : 0 }
  }
  while (cp < code.length) { let _op = op[code[cp]]; _op ? _op() : 0; cp++ }
  return output
}
