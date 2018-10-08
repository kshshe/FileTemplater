import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/template-select/DefaultPage';

describe('template-select/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      templateSelect: {},
      actions: {},
    };
    const renderedComponent = shallow(<DefaultPage {...props} />);

    expect(renderedComponent.find('.template-select-default-page').length).toBe(1);
  });
});
