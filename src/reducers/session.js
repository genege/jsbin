import {
  CHANGE_OUTPUT,
  OUTPUT_NONE,
  TOGGLE_OUTPUT,
  OUTPUT_PAGE,
  TRIGGER_PALETTE,
  SET_CURSOR,
  SET_ERROR,
  CLEAR_ERROR,
  DIRTY,
} from '../actions/session';

import { RESET } from '../actions/bin';

import * as MODES from '../lib/cm-modes';

const defaultCursorState = {
  [`cursor${MODES.HTML}`]: '8:0', // start on the blank line
  [`cursor${MODES.JAVASCRIPT}`]: '0:0', // start on the blank line
  [`cursor${MODES.CSS}`]: '0:0', // start on the blank line
};

const defaultState = {
  openPanel: MODES.HTML,
  output: OUTPUT_PAGE,
  lastOutput: OUTPUT_NONE,
  palette: false,
  error: null,
  dirty: false,
  ...defaultCursorState,
};

export default function reducer(state = defaultState, action) {
  const { type } = action;
  if (type === RESET) {
    return { ...state, ...defaultCursorState, error: null };
  }

  if (type === DIRTY) {
    return { ...state, dirty: action.value };
  }

  if (type === TOGGLE_OUTPUT) {
    const output =
      state.output === OUTPUT_NONE ? state.lastOutput : OUTPUT_NONE;
    return { ...state, lastOutput: state.output, output };
  }

  if (type === SET_ERROR) {
    return { ...state, error: action.value };
  }

  if (type === CLEAR_ERROR) {
    return { ...state, error: null };
  }

  if (type === CHANGE_OUTPUT) {
    return { ...state, output: action.value };
  }

  if (type === SET_CURSOR) {
    if (!state[`cursor${action.panel}`]) {
      // ignore unknown panels
      return state;
    }
    return { ...state, [`cursor${action.panel}`]: action.value };
  }

  if (type === TRIGGER_PALETTE) {
    return { ...state, palette: action.value };
  }

  return state;
}
