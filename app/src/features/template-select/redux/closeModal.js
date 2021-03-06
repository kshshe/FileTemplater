// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TEMPLATE_SELECT_CLOSE_MODAL,
} from './constants';

export function closeModal() {
  return {
    type: TEMPLATE_SELECT_CLOSE_MODAL,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TEMPLATE_SELECT_CLOSE_MODAL:
      return {
        ...state,
        opened: false,
      };

    default:
      return state;
  }
}
