import styled, { css } from 'styled-components'
import { LetterGridRange, isGridPositionWithinRange } from '../word-grid';
import { getMaxLength } from '../utils';

const LetterBox = styled.div<{ $highlight: boolean; }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  ${props => props.$highlight ? css`
    font-size: 50px;
    color: var(--primary-color);
  ` : css`
    color: var(--secondary-color);
    font-size: 30px;
  `}
`

const LetterColumns = styled.div<{ $count: number; }>`
  display: grid;
  height: 50px;
  grid-template-columns: repeat(${p => p.$count}, 1fr);
`

type Props = {
  grid: string[][],
  highlightedCells: LetterGridRange[]
}

function LetterGrid(props: Props) {
  const columnCount = getMaxLength(props.grid)

  return props.grid.map((row, y) => {
    const elements = row.map((letter, x) => {
      const isHighlighted = isGridPositionWithinRange({x, y}, props.highlightedCells)
      return <LetterBox $highlight={isHighlighted} key={x}>{letter}</LetterBox>
    })

    return (
      <LetterColumns key={y} $count={columnCount}>
        {elements}
      </LetterColumns>
    )
  })
}

export default LetterGrid
