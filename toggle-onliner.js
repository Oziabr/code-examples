[].reduce((a, b) => b == key ? a.splice(1) : (b ? a.concat(b): a), [key])
