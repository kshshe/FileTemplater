import { TEMPLATE_SELECT_OPEN_MODAL } from '../../../../src/features/template-select/redux/constants';

import { openModal, reducer } from '../../../../src/features/template-select/redux/openModal';

describe('template-select/redux/openModal', () => {
  it('returns correct action by openModal', () => {
    expect(openModal()).toHaveProperty('type', TEMPLATE_SELECT_OPEN_MODAL);
  });

  it('handles action type TEMPLATE_SELECT_OPEN_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(prevState, { type: TEMPLATE_SELECT_OPEN_MODAL });
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
