import React from 'react';
import { shallow, mount } from 'enzyme';
import { HeaderBar} from '../components/header-bar';
import '../setupTests';

describe('<HeaderBar />', () => {
  it('Should smoke test the App component', () => {
    shallow( <HeaderBar /> );
    });
  });