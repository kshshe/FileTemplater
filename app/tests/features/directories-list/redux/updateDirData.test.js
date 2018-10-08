import { DIRECTORIES_LIST_UPDATE_DIR_DATA } from '../../../../src/features/directories-list/redux/constants';

import {
  updateDirData,
  reducer,
} from '../../../../src/features/directories-list/redux/updateDirData';

describe('directories-list/redux/updateDirData', () => {
  it('returns correct action by updateDirData', () => {
    expect(updateDirData()).toHaveProperty('type', DIRECTORIES_LIST_UPDATE_DIR_DATA);
  });

  it('handles action type DIRECTORIES_LIST_UPDATE_DIR_DATA correctly', () => {
    const prevState = {};
    const state = reducer(prevState, { type: DIRECTORIES_LIST_UPDATE_DIR_DATA });
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
