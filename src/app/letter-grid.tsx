import styled, { css } from 'styled-components'
import { LetterGridRange, isGridPositionWithinRange } from '../word-grid';
import { getMaxLength } from '../utils';

const LetterBox = styled.div<{ $highlight: boolean; }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.$highlight ? css`
    font-size: 50px;
    color: var(--primary-color);
    text-shadow:
      0 0 7px var(--primary-color),
      0 0 10px var(--primary-color),
      0 0 21px var(--primary-color),
      0 0 42px yellow,
      0 0 82px yellow,
      0 0 92px yellow,
      0 0 102px yellow,
      0 0 151px yellow;
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
