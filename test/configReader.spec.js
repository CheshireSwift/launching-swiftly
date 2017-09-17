'use strict'
let expect = require('unexpected')

describe('The config reader', () => {
  let readConfig = require('../configReader.js').read

  it('loads the modules into a dictionary', () => {
    let configJSON = `{
      "modules": {
        "web": {},
        "terminal": {},
        "launcher": {}
      }
    }`

    expect(readConfig(configJSON).modules, 'to have keys', 'web', 'terminal', 'launcher')
  })

  it('converts layout arrays to CSS values', () => {
    let configJSON = `{
      "layout": [
        ["a", "b", "c"],
        ["a", "d", "d"]
      ]
    }`

    expect(readConfig(configJSON).templateAreas, 'to be', '"a b c"' +
                                                          '"a d d"')
  })

  it('warns if there are modules not used in the layout', () => {
    let configJSON = `{
      "modules": {
        "a": {},
        "b": {},
        "c": {}
      },
      "layout": [
        ["a"]
      ]
    }`

    expect(readConfig(configJSON).warnings, 'to contain', 'Module "b" is defined but not used.')
    expect(readConfig(configJSON).warnings, 'to contain', 'Module "c" is defined but not used.')
  })

  it('warns if there are undefined modules in the layout', () => {
    let configJSON = `{
      "modules": {
        "a": {}
      },
      "layout": [
        ["a", "b", "c"]
      ]
    }`
    expect(readConfig(configJSON).warnings, 'to contain', 'Module "b" is not defined.')
    expect(readConfig(configJSON).warnings, 'to contain', 'Module "c" is not defined.')
  })

  it('errors when not given valid JSON', () => {
    function callingConfigReaderWithInvalidInput() {
      readConfig('}')
    }

    expect(callingConfigReaderWithInvalidInput, 'to error', 'Unexpected token }')
  })
})
