import { TEMPLATE_SELECT_UPDATE_TEMPLATES_LIST } from '../../../../src/features/template-select/redux/constants';

import {
  updateTemplatesList,
  reducer,
} from '../../../../src/features/template-select/redux/updateTemplatesList';

describe('template-select/redux/updateTemplatesList', () => {
  it('returns correct action by updateTemplatesList', () => {
    expect(updateTemplatesList()).toHaveProperty('type', TEMPLATE_SELECT_UPDATE_TEMPLATES_LIST);
  });

  it('handles action type TEMPLATE_SELECT_UPDATE_TEMPLATES_LIST correctly', () => {
    const prevState = {};
    const state = reducer(prevState, { type: TEMPLATE_SELECT_UPDATE_TEMPLATES_LIST });
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
