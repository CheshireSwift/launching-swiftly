import styled from 'styled-components'

export type Props = {
  area: string,
  blockColor: ?string
};

const GridElement = styled.div`
  grid-area: ${(props: Props) => props.area};
  ${(props: Props) => props.blockColor && `
    background: var(--scheme-${props.blockColor})
  `}
`

export default GridElement
