'use strict'

/* global describe it */
const expect = require('unexpected')

describe('The config reader', () => {
  const configReader = require('../configReader.js')
  const readConfig = configReader.read

  it('loads the modules into a dictionary', () => {
    const config = {
      'modules': {
        'web': {},
        'terminal': {},
        'launcher': {}
      }
    }

    expect(readConfig(config).modules, 'to have keys', 'web', 'terminal', 'launcher')
  })

  it('converts layout arrays to CSS values', () => {
    const config = {
      'layout': [
        ['a', 'b', 'c'],
        ['a', 'd', 'd']
      ]
    }

    expect(readConfig(config).templateAreas, 'to be', '"a b c"' +
                                                      '"a d d"')
  })

  it('warns if there are modules not used in the layout', () => {
    const config = {
      'modules': {
        'a': {},
        'b': {},
        'c': {}
      },
      'layout': [
        ['a']
      ]
    }

    expect(readConfig(config).warnings, 'to contain', 'Module "b" is defined but not used.')
    expect(readConfig(config).warnings, 'to contain', 'Module "c" is defined but not used.')
  })

  it('warns if there are undefined modules in the layout', () => {
    const config = {
      'modules': {
        'a': {}
      },
      'layout': [
        ['a', 'b', 'c']
      ]
    }
    expect(readConfig(config).warnings, 'to contain', 'Module "b" is not defined.')
    expect(readConfig(config).warnings, 'to contain', 'Module "c" is not defined.')
  })

  it('errors when not given valid ', () => {
    function callingConfigReaderWithInvalidInput () { configReader.readJSON('}') }
    expect(callingConfigReaderWithInvalidInput, 'to error', /unexpected token/i)
  })
})
