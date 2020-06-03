import { CODES, colsCount } from '@/components/table/table.helpers';
import { defaultStyles } from '@/constans';
import { camelCaseToDashCase } from '@core/utils';

const DATA_TYPE = 'resizable';
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createRow(content, index, state = {}) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  const height = getHeight(state, index);
  return `
    <div
      class="row"
      data-type="${DATA_TYPE}"
      data-row="${index}"
      style="height: ${height}"
    >
      <div class="row-info">${index ? index : ''} ${resize}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    const styles = Object.keys(defaultStyles)
        .map(key => `${camelCaseToDashCase(key)}: ${defaultStyles[key]}`)
        .join(';');

    return `
      <div 
        class="cell"
        contenteditable
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        style="${styles}; width: ${width}"
      >${data || ''}</div>`;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div
      class="column"
      style="width: ${width}"
      data-type="${DATA_TYPE}"
      data-col="${index}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const rows = [];
  const cols = new Array(colsCount())
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount())
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join('');
}
