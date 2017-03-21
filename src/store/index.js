// @flow
import { createStore as createReduxStore } from 'redux';

import rootReducer from '../reducers';

export function createStore(initialState: ?Object): Object {
    return createReduxStore(rootReducer, initialState);
}
