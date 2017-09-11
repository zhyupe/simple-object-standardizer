const sos = require('../')
const value = sos.value
const assert = require('assert')

const ident = assert.strictEqual
const deepIdent = assert.deepStrictEqual

describe('rule is string', function () {
  it('should return default value if not defined or is null', function () {
    ident(value(null, '1234'), '1234')
    ident(value(undefined, '5678'), '5678')
  })
  it('should return string form', function () {
    ident(value('', ''), '')
    ident(value('1', ''), '1')
    ident(value(1, ''), '1')
    ident(value(1.23456789, ''), '1.23456789')
    ident(value(true, ''), 'true')
    ident(value(NaN, ''), 'NaN')
  })
})

describe('rule is number', function () {
  it('should return default value if not defined or is null', function () {
    ident(value(null, 1234), 1234)
    ident(value(undefined, 5678), 5678)
  })
  it('should return number form', function () {
    ident(value(0, 0), 0)
    ident(value('1', 0), 1)
    ident(value('1.23456789', 0), 1.23456789)
    ident(value(true, 0), 1)
  })
  it('should return default value if invalid', function () {
    ident(value('abc', 233), 233)
    ident(value(NaN, 0), 0)
  })
})

describe('rule is array', function () {
  it('should return empty array if not defined or is null', function () {
    deepIdent(value(null, []), [])
    deepIdent(value(undefined, [ 123 ]), [])
  })
  it('should follow sub rule', function () {
    deepIdent(value([ 123, '456', null ], [ 789 ]), [ 123, 456, 789 ])
  })
})