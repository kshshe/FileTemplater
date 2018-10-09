// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  FILE_PREVIEW_SET_FILE,
} from './constants';

export function setFile(name, data) {
  return {
    type: FILE_PREVIEW_SET_FILE,
    name, 
    data
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FILE_PREVIEW_SET_FILE:
      return {
        ...state,
        file: action.data,
        filename: action.name,
  opened:true
      };

    default:
      return state;
  }
}
