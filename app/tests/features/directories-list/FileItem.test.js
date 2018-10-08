import React from 'react';
import { shallow } from 'enzyme';
import { FileItem } from '../../../src/features/directories-list/FileItem';

describe('directories-list/FileItem', () => {
  it('renders node with correct class name', () => {
    const props = {
      directoriesList: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FileItem {...props} />
    );

    expect(
      renderedComponent.find('.directories-list-file-item').length
    ).toBe(1);
  });
});
