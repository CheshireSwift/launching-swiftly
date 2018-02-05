'use babel'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const GridElement = styled.div`
  grid-area: ${props => props.area};
  ${props => props.blockColor && `
    background: var(--scheme-${props.blockColor})
  `}
`

GridElement.propTypes = {
  area: PropTypes.string.isRequired,
  blockColor: PropTypes.string
}

export default GridElement
