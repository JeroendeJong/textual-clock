import styled, { css } from 'styled-components'
import { LetterGridRange, isGridPositionWithinRange } from '../word-grid';
import { getMaxLength } from '../utils';
import { useResize } from '../use-resize';

const LetterBox = styled.div<{ $highlight: boolean, $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${p => css`
    width:  ${p.$size}px;
    height: ${p.$size}px;
    color: ${p.$highlight ? 'var(--primary-color)' : 'var(--secondary-color)'};
    font-size: ${p.$highlight ? `${p.$size}px` : `${Math.round(p.$size * 0.6)}px`};
  `}
`

const LetterColumns = styled.div<{ $count: number; }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$count}, 1fr);
`

type Props = {
  grid: string[][],
  highlightedCells: LetterGridRange[]
}

function LetterGrid(props: Props) {
  const columnCount = getMaxLength(props.grid)
  const size = useResize()
  const squareSize = findSize(size[0], columnCount)

  return props.grid.map((row, y) => {
    const elements = row.map((letter, x) => {
      const isHighlighted = isGridPositionWithinRange({x, y}, props.highlightedCells)
      return <LetterBox $highlight={isHighlighted} $size={squareSize} key={x}>{letter}</LetterBox>
    })

    return (
      <LetterColumns key={y} $count={columnCount}>
        {elements}
      </LetterColumns>
    )
  })
}

function findSize(windowWidth: number, columns: number) {
  const squareSize = windowWidth / columns
  if (squareSize > 50) return 50;

  return Math.floor(squareSize)
}

export default LetterGrid
