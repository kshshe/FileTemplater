import {
  FILE_PREVIEW_SET_FILE,
} from '../../../../src/features/file-preview/redux/constants';

import {
  setFile,
  reducer,
} from '../../../../src/features/file-preview/redux/setFile';

describe('file-preview/redux/setFile', () => {
  it('returns correct action by setFile', () => {
    expect(setFile()).toHaveProperty('type', FILE_PREVIEW_SET_FILE);
  });

  it('handles action type FILE_PREVIEW_SET_FILE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: FILE_PREVIEW_SET_FILE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
