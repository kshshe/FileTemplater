import React from 'react';
import { shallow } from 'enzyme';
import { DirectoryItem } from '../../../src/features/directories-list/DirectoryItem';

describe('directories-list/DirectoryItem', () => {
  it('renders node with correct class name', () => {
    const props = {
      directoriesList: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DirectoryItem {...props} />
    );

    expect(
      renderedComponent.find('.panel-block').length
    ).toBe(1);
  });
});
