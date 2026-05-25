import React from 'react';
import MyJourney from './MyJourney';
import { Provider } from 'react-redux';
import store from '../../store/store';
import '../css/comman-style.css';
import '../css/responsive-main.css';

function NewDashboard() {
  return (
    <Provider store={store}>
      <MyJourney />
    </Provider>
  );
}

export default NewDashboard;
