'use strict'
let _ = require('lodash')

function read (json) {
  let config = JSON.parse(json)
  let modules = config.modules
  let templateAreas = _.reduce(
      config.layout,
      (template, row) => `${template}"${row.join(' ')}"`,
      ''
    )
    //templateAreas: _(config.layout)
    //  .map(row => '"' + row.join(' ') + '"')
    //  .join('')
    //templateAreas: _.reduce(
    //  config.layout,
    //  (template, row) => template + '"' + row.join(' ') + '"',
    //  ''
    //)

  let unusedModules = _.difference(_.keys(config.modules), _.flatten(config.layout))
  let unusedModuleWarnings = _.map(unusedModules, moduleName => `Module "${moduleName}" is defined but not used.`)

  let undefinedModules = _.difference(_.flatten(config.layout), _.keys(config.modules))
  let undefinedModuleWarnings = _.map(undefinedModules, moduleName => `Module "${moduleName}" is not defined.`)

  let warnings = _.flatten([
    unusedModuleWarnings,
    undefinedModuleWarnings
  ])

  return {
    modules,
    templateAreas,
    warnings
  }
}

module.exports = {
  read
}
