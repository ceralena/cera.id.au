// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './containers/AppContainer';

export const ceraMain = () => {
    const elem: ?HTMLElement = document.getElementById('main');

    if (elem === null) {
        throw new Error('Could not find element with id \'main\'');
    }

    ReactDOM.render(
        <AppContainer />,
        elem
    );
};
