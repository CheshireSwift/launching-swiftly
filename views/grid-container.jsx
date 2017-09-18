'use babel'

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import GridElement from './grid-element'

const STYLE = {
  display: 'grid',
  gridColumnGap: 5,
  gridRowGap: 5,
  height: 'calc(100vh - 20px)',
  width: '100%'
}

export default class GridContainer extends React.Component {
  render () {
    let styles = _.merge({},
      STYLE,
      { gridTemplateAreas: this.props.templateAreas }
    )

    let blocks = _.map(this.props.modules, (moduleConfig, moduleName) =>
      <GridElement key={moduleName} area={moduleName} blockColor={moduleConfig.color} />
    )

    return <div style={styles}>{blocks}</div>
  }
}

GridContainer.propTypes = {
  templateAreas: PropTypes.string.isRequired,
  modules: PropTypes.object.isRequired
}
