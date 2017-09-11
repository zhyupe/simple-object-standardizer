let toNumber = function (val, rule) {
  val = +val
  if (isNaN(val)) {
    val = rule
  }

  return val
}

let processValue = function (val, rule) {
  if (typeof val === 'undefined' || val === null) {
    return Array.isArray(rule) ? [] : rule
  }

  switch (typeof rule) {
    case 'string':
      return val.toString()
    case 'number':
      return toNumber(val, rule)
    case 'boolean':
      return val !== 'false' && !!val
    case 'object':
      if (rule === null) return val
      if (Array.isArray(rule)) {
        rule = rule.length > 0 ? rule[0] : null

        if (Array.isArray(val)) {
          return val.map(item => processValue(item, rule))
        } else {
          return [ processValue(val, rule) ]
        }
      } else {
        return processObject(val, rule)
      }
    // case 'function': // not implemented
  }
  return rule
}

let processObject = function (obj, rule) {
  if (typeof obj !== 'object') return processValue(obj, rule)

  let ret = {}
  let keys = Object.keys(rule)
  for (let key of keys) {
    ret[key] = processValue(obj[key], rule[key])
  }

  return ret
}

processObject.value = processValue
module.exports = processObject
