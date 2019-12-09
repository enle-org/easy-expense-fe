import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Index from './index';

configure({ adapter: new Adapter() });

describe('With Enzyme', () => {
  it('Index page renders', () => {
    const index = mount(<Index />);
    expect(index).toBeTruthy();
  });
});
