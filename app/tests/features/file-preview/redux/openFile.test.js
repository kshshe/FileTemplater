import {
  FILE_PREVIEW_OPEN_FILE,
} from '../../../../src/features/file-preview/redux/constants';

import {
  openFile,
  reducer,
} from '../../../../src/features/file-preview/redux/openFile';

describe('file-preview/redux/openFile', () => {
  it('returns correct action by openFile', () => {
    expect(openFile()).toHaveProperty('type', FILE_PREVIEW_OPEN_FILE);
  });

  it('handles action type FILE_PREVIEW_OPEN_FILE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: FILE_PREVIEW_OPEN_FILE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
