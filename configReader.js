'use strict'
let _ = require('lodash')

function readJSON(json) {
  read(JSON.parse(json))
}
function read(config) {
  let modules = config.modules
  let templateAreas = _(config.layout)
    .map(row => `"${row.join(' ')}"`)
    .join('')

  let unusedModules = _.difference(_.keys(config.modules), _.flatten(config.layout))
  let unusedModuleWarnings = _.map(unusedModules, moduleName => `Module "${moduleName}" is defined but not used.`)

  // TODO: dedup layout entries
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
  read, readJSON
}
