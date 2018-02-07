'use strict'
const _ = require('lodash')

function readJSON(json) {
  read(JSON.parse(json))
}

function read(config) {
  const modules = config.modules
  const templateAreas = _(config.layout)
    .map(row => `"${row.join(' ')}"`)
    .join('')

  const unusedModules = _.difference(_.keys(config.modules), _.flatten(config.layout))
  const unusedModuleWarnings = _.map(unusedModules, moduleName => `Module "${moduleName}" is defined but not used.`)

  // TODO: dedup layout entries
  const undefinedModules = _.difference(_.flatten(config.layout), _.keys(config.modules))
  const undefinedModuleWarnings = _.map(undefinedModules, moduleName => `Module "${moduleName}" is not defined.`)

  const warnings = [...unusedModuleWarnings, ...undefinedModuleWarnings]

  return { modules, templateAreas, warnings }
}

module.exports = {
  read,
  readJSON
}
