import React from 'react';
import { shallow, mount } from 'enzyme';
import { Header } from '../components/header';
import '../setupTests';

describe('<Header />', () => {
  it('Should smoke test the App component', () => {
    shallow( <Header /> );
    });
  });