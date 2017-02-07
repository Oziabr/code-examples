# 4kyu
# https://www.codewars.com/kata/52605419be184942d400003d

defaultArguments = (func, params) ->
  res = ->
    defs = func.toString().slice(10).match(/^[^)]*/)[0].replace /\/\*[^*]*\*\/| /g, ''
    args = defs.split(',').map (p) -> params[p]
    Array.from(arguments).forEach (p, i) -> args[i] = p
    func args...
  res.toString = -> func.toString()
  res