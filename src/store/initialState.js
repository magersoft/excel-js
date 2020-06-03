import { storage } from '@core/utils';
import { defaultStyles } from '@/constans';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyle: defaultStyles
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
