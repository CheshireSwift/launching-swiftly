import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import GridElement from './grid-element'

const GridOuter = styled.div`
  height: calc(100vh - 20px);
  width: 100%;
  display: grid;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  grid-template-areas: ${(props: { templateAreas: string }) => props.templateAreas};
`

export type Props = {
  templateAreas: string,
  modules: Object,
};

const GridContainer = (props: Props) => (
  <GridOuter templateAreas={props.templateAreas}>
    {
      _.map(props.modules, (moduleConfig, moduleName) =>
        <GridElement key={moduleName} area={moduleName} blockColor={moduleConfig.color} />
      )
    }
  </GridOuter>
)

export default GridContainer
