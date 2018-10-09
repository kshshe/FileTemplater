// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  FILE_PREVIEW_CLOSE_FILE,
} from './constants';

export function closeFile() {
  return {
    type: FILE_PREVIEW_CLOSE_FILE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FILE_PREVIEW_CLOSE_FILE:
      return {
        ...state,
  opened: false
      };

    default:
      return state;
  }
}
