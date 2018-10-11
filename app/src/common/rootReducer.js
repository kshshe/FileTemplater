import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import directoriesListReducer from '../features/directories-list/redux/reducer';
import templateSelectReducer from '../features/template-select/redux/reducer';
import filePreviewReducer from '../features/file-preview/redux/reducer';
import templatesReducer from '../features/templates/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
  directoriesList: directoriesListReducer,
  templateSelect: templateSelectReducer,
  filePreview: filePreviewReducer,
  templates: templatesReducer,
};

export default combineReducers(reducerMap);
