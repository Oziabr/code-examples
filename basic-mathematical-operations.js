// 8kyu
// https://www.codewars.com/kata/57356c55867b9b7a60000bd7

function basicOp(op, a, b)
{
  if (op == '*') return a*b
  if (op == '/') return a/b
  return a + ( + (op + b))
}