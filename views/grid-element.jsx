'use babel'

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

export default class GridElement extends React.Component {
  render () {
    let styles = _.merge({},
        { 'gridArea': this.props.area },
        this.props.blockColor && { 'background': `var(--scheme-${this.props.blockColor})` }
    )
    return <div style={styles} />
  }
}

GridElement.propTypes = {
  area: PropTypes.string,
  blockColor: PropTypes.string
}
