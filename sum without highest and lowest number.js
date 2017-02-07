// 8kyu
// https://www.codewars.com/kata/sum-without-highest-and-lowest-number

const sumArray = arr => !arr || !arr.length || arr.length < 3 ? 0 : arr.reduce((r, c) => [r[0] + c, Math.min(r[1], -c), Math.max(r[2], -c)], [0, Infinity, -Infinity]).reduce((r, c) => r + c)
