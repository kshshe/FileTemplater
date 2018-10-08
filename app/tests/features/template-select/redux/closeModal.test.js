import { TEMPLATE_SELECT_CLOSE_MODAL } from '../../../../src/features/template-select/redux/constants';

import { closeModal, reducer } from '../../../../src/features/template-select/redux/closeModal';

describe('template-select/redux/closeModal', () => {
  it('returns correct action by closeModal', () => {
    expect(closeModal()).toHaveProperty('type', TEMPLATE_SELECT_CLOSE_MODAL);
  });

  it('handles action type TEMPLATE_SELECT_CLOSE_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(prevState, { type: TEMPLATE_SELECT_CLOSE_MODAL });
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
