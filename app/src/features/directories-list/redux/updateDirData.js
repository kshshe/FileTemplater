// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { DIRECTORIES_LIST_UPDATE_DIR_DATA } from './constants';

export function updateDirData(path, files) {
  return {
    type: DIRECTORIES_LIST_UPDATE_DIR_DATA,
    files,
    path,
  };
}

export function updateAtKey(data, key, newValue) {
  let newData = typeof data === 'object' ? { ...data } : [...data];
  let keys = key.split('.');
  let firstKey = keys.splice(0, 1)[0];
  if (newData.dir) {
    if (typeof newData.children === "undefined") {
      newData.children = {};
    }
    newData.children = updateAtKey(newData.children, key, newValue)
  } else {
    if (firstKey) {
      newData[firstKey] = updateAtKey(newData[firstKey], keys.join('.'), newValue)
    } else {
      newData = newValue
    }
  }
  return newData;
}

export function reducer(state, action) {
  let newRoot = { ...state.root };
  switch (action.type) {
    case DIRECTORIES_LIST_UPDATE_DIR_DATA:
      let dirs = action.path
        .split('.')
        .join('')
        .split('/')
        .filter(item => item !== "")
        .join('.');
      newRoot = updateAtKey(newRoot, dirs, action.files);
      return {
        ...state,
        root: newRoot,
      };

    default:
      return state;
  }
}
