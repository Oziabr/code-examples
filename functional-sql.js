// 1kyu
// https://www.codewars.com/kata/545434090294935e7d0010ab

var query = function() {
  var mimic, from, field, where = [], having, orderBy, groupBy;
  return mimic = {
    select: function() {
      if (field != undefined) throw Error('Duplicate SELECT');
      field = arguments[0] || '';
      return mimic;
    },
    from: function() {
      if (from) throw Error('Duplicate FROM');
      from = Array.from(arguments);
      return mimic;
    },
    groupBy: function() {
      if (groupBy) throw Error('Duplicate GROUPBY');
      groupBy = Array.from(arguments);
      return mimic;
    },
    orderBy: function() {
      if (orderBy) throw Error('Duplicate ORDERBY');
      orderBy = Array.from(arguments);
      return mimic;
    },
    where: function() {
      where.push(Array.from(arguments));
      return mimic;
    },
    having: function() {
      having = arguments[0];
      return mimic;
    },
    execute: function() {
      var aggregate;
      source = []
      if (from) source = from.reduce((res, s, n) => n?res.reduce((cur, r) => cur.concat(s.slice().map(xs => [ r, xs ])), []):res, from[0].slice())
      if (where.length) where.forEach(where => source = where.reduce((res, w) => res.concat(source.filter(w)), []))
      if (groupBy) source = source.reduce(function(agg, row) {
        groupBy.reduce((res, gp) => (res.find((f) => f[0] == gp(row)) || (res[res.length] = [gp(row), []]))[1], agg).push(row)
        return agg
      }, aggregate = [])
      if (having) source = source.filter(having)
      if (field)  source = source.map(field)
      if (orderBy) orderBy.forEach(o => source.sort(o))
      return source;
    }
  }
};
