// @flow
import Inferno from 'inferno';
import { Provider } from 'inferno-redux';

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

    Inferno.render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        elem
    );
};
