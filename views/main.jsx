'use babel'

import {ipcRenderer} from 'electron'
import React from 'react'
import _ from 'lodash'

import GridContainer from './grid-container.jsx'

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      config: {
        modules: {},
        templateAreas: ''
      }
    }
  }

  componentDidMount () {
    ipcRenderer.on('config-changed', this.configChanged.bind(this))
  }

  componentWillUnmount () {
    ipcRenderer.remove('config-changed', this.configChanged.bind(this))
  }

  configChanged (event, config) {
    if (_.size(config.warnings)) {
      window.alert(config.warnings.join('\n'))
    }
    this.setState({config})
  }

  render () {
    return <GridContainer modules={this.state.config.modules} templateAreas={this.state.config.templateAreas} />
  }
}
