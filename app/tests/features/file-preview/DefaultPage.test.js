import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/file-preview/DefaultPage';

describe('file-preview/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      filePreview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.file-preview-default-page').length
    ).toBe(1);
  });
});
