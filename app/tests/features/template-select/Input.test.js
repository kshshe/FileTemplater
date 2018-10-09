import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/template-select';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Input />);
  expect(renderedComponent.find('.template-select-input').length).toBe(1);
});
