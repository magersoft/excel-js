import { CODES, colsCount } from '@/components/table/table.helpers';

const DATA_TYPE = 'resizable';

function createRow(content, index) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  return `
    <div class="row" data-type="${DATA_TYPE}">
      <div class="row-info">${index ? index : ''} ${resize}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toCell(row) {
  return function(_, col) {
    return `
      <div 
        class="cell"
        contenteditable
        data-type="cell"
        data-col="${col}"
        data-id="${row}:${col}"
      ></div>`;
  };
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="${DATA_TYPE}" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const rows = [];
  const cols = new Array(colsCount())
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount())
        .fill('')
        .map(toCell(row))
        .join('');

    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
