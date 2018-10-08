import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/directories-list/DefaultPage';

describe('directories-list/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      directoriesList: {},
      actions: {},
    };
    const renderedComponent = shallow(<DefaultPage {...props} />);

    expect(renderedComponent.find('.directories-list-default-page').length).toBe(1);
  });
});
