import React from 'react';
import { shallow, mount } from 'enzyme';
import { RegistrationPage } from '../components/registration-page';
import '../setupTests';


describe('<RegistrationPage />', () => {
  it('Should smoke test the Feedback component', () => {
    shallow( <RegistrationPage /> );
    });
  });