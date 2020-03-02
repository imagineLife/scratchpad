import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Area from '.';

describe('<Area/>', () => {
  it('matches snapshot', () => {
    const comp = shallow(<Area />);
    expect(toJson(comp)).toMatchSnapshot();
  });
});
