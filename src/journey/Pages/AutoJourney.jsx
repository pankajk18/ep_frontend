import React from 'react';
import MyJourney from './MyJourney';
import { Provider } from 'react-redux';
import store from '../../store/store';
import '../css/comman-style.css';
import '../css/responsive-main.css';
import AutoMyJourney from './AutoMyJourney';

function AutoJourney() {
  return (
    <Provider store={store}>
      <AutoMyJourney />
    </Provider>
  );
}

export default AutoJourney;
