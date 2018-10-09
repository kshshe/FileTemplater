import {
  FILE_PREVIEW_CLOSE_FILE,
} from '../../../../src/features/file-preview/redux/constants';

import {
  closeFile,
  reducer,
} from '../../../../src/features/file-preview/redux/closeFile';

describe('file-preview/redux/closeFile', () => {
  it('returns correct action by closeFile', () => {
    expect(closeFile()).toHaveProperty('type', FILE_PREVIEW_CLOSE_FILE);
  });

  it('handles action type FILE_PREVIEW_CLOSE_FILE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: FILE_PREVIEW_CLOSE_FILE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
