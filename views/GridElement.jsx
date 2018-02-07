import React from 'react'
import styled from 'styled-components'

import { execute, read } from '../executor'

export type Props = {
  area: string,
  blockColor: ?string
};

type BlockProps = {
  area: string,
  blockColor: ?string,
}

const ColouredBlock = styled.div`
  grid-area: ${(props: BlockProps) => props.area};
  ${(props: BlockProps) => props.blockColor && `
    background: var(--scheme-${props.blockColor})
  `}
`

const GridElement = (props: Props) => (
  <ColouredBlock
    area={props.area}
    blockColor={props.blockColor}
  />
)

export default GridElement
