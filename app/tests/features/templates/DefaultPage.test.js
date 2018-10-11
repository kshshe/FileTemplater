import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/templates/DefaultPage';

describe('templates/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      templates: {},
      actions: {},
    };
    const renderedComponent = shallow(<DefaultPage {...props} />);

    expect(renderedComponent.find('.templates-default-page').length).toBe(1);
  });
});
