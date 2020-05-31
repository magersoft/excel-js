import { range } from '@core/utils';

export const CODES = {
  A: 65,
  Z: 90
};

export function colsCount() {
  return CODES.Z - CODES.A + 1;
}

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((accumulator, col) => {
    rows.forEach(row => accumulator.push(`${row}:${col}`));
    return accumulator;
  }, []);
}

export function nextSelector(key, shift, { col, row }, event, rowCounts) {
  const maxRows = rowCounts - 1;
  const maxCols = colsCount() - 1;

  switch (key) {
    case 'Enter':
      if (!shift) {
        event.preventDefault();
        row = row >= maxRows ? maxRows : row + 1;
        break;
      }
      break;
    case 'ArrowDown':
      row = row >= maxRows ? maxRows : row + 1;
      break;
    case 'Tab':
      shift
        ? col - 1 < 0 ? 0 : col--
        : col >= maxCols ? maxCols : col++;
      break;
    case 'ArrowRight':
      col = col >= maxCols ? maxCols : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < 0 ? 0 : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < 0 ? 0 : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
