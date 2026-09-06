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

const LetterGridContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LetterColumns = styled.div<{ $count: number; $size: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$count}, ${p => p.$size}px);
`

type Props = {
  grid: string[][],
  highlightedCells: LetterGridRange[]
}

function LetterGrid(props: Props) {
  const columnCount = getMaxLength(props.grid)
  const [windowWidth, windowHeight] = useResize()
  const squareSize = findSize(windowWidth, windowHeight, columnCount, props.grid.length)

  return (
    <LetterGridContainer>
      {props.grid.map((row, y) => {
        const elements = row.map((letter, x) => {
          const isHighlighted = isGridPositionWithinRange({ x, y }, props.highlightedCells)
          return <LetterBox $highlight={isHighlighted} $size={squareSize} key={x}>{letter}</LetterBox>
        })

        return (
          <LetterColumns key={y} $count={columnCount} $size={squareSize}>
            {elements}
          </LetterColumns>
        )
      })}
    </LetterGridContainer>
  )
}

const VIEWPORT_PADDING = 32
const MIN_SQUARE_SIZE = 50

function findSize(windowWidth: number, windowHeight: number, columns: number, rows: number) {
  const squareSize = Math.min(
    MIN_SQUARE_SIZE,
    Math.floor((windowWidth - VIEWPORT_PADDING) / columns),
    Math.floor((windowHeight - VIEWPORT_PADDING) / rows),
  )

  return Math.max(1, squareSize)
}

export default LetterGrid
