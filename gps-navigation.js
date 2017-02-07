// 3kyu
// https://www.codewars.com/kata/5244ab738978478c1800002e

function navigate(n, roads, start, finish) {
  if (start == finish) return [start]
  var result, routes = [[0, start]]
  while (n-- && routes.length) {
    routes = routes.reduce((res, rt, i) =>
      res.concat(roads
        .filter(r => r.from == rt[rt.length-1])
        .map(function (r) {
          var nr = rt.concat(r.to)
          nr[0] += r.drivingTime
          return nr
        })
      )
    , []).filter(rt => {
      if (result && rt[0] > result[0]) return false
      if (finish != rt[rt.length-1]) return true
      result = result || rt
      result = rt[0] < result[0] ? rt : result
    })
  }
  return result ? result.slice(1) : null
}
