'use babel'

import React from 'react'
import GridContainer from './grid-container.jsx'

import configReader from '../configReader'

let config = configReader.read(JSON.stringify({
  modules: {
    one: { color: 'red' },
    two: { color: 'orange' },
    thr: { color: 'yellow' },
    fou: { color: 'green' },
    fiv: { color: 'blue' },
    six: { color: 'violet' }
  },
  layout: [
    ['one', 'one', 'two', 'two'],
    ['one', 'one', 'fou', 'thr'],
    ['six', 'six', 'fou', 'fiv']
  ]
}))

export default class Main extends React.Component {
  render () {
    return <GridContainer modules={config.modules} templateAreas={config.templateAreas} />
  }
}
