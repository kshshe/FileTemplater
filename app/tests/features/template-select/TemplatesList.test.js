import React from 'react';
import { shallow } from 'enzyme';
import { TemplatesList } from '../../../src/features/template-select/TemplatesList';

describe('template-select/TemplatesList', () => {
  it('renders node with correct class name', () => {
    const props = {
      templateSelect: {},
      actions: {},
    };
    const renderedComponent = shallow(<TemplatesList {...props} />);

    expect(renderedComponent.find('.template-select-templates-list').length).toBe(1);
  });
});
