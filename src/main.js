// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './containers/AppContainer';

import {createStore} from './store';

export const ceraMain = (initialState: mixed) => {
    const elem: ?HTMLElement = document.getElementById('root');

    if (elem === null) {
        throw new Error('Could not find element with id \'root\'');
    }

    if (!(initialState instanceof Object)) {
        throw new Error('initial state must be an object');
    }

    const store = createStore(initialState);

    debugger;

    ReactDOM.render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        elem
    );
};
