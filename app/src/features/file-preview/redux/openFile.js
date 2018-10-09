// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  FILE_PREVIEW_OPEN_FILE,
} from './constants';

export function openFile() {
  return {
    type: FILE_PREVIEW_OPEN_FILE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FILE_PREVIEW_OPEN_FILE:
      return {
        ...state,
  opened:true
      };

    default:
      return state;
  }
}
