import React from 'react';
import { shallow } from 'enzyme';
import { Preloader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Preloader />);
  expect(renderedComponent.find('.common-preloader').length).toBe(1);
});
