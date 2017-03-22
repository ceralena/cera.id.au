// @flow
/* global process */
import express from 'express';

import { renderToString } from 'inferno-server';
import { Provider } from 'inferno-redux';

import { createStore } from '../store';
import AppContainer from '../containers/AppContainer';
import rootReducer from '../reducers';

import { loadConfig, Config } from './config';

function renderFullPage(html: string, preloadedState: Object, isProduction: boolean) {
    const vendorScript = isProduction ? '' : '<script src="/static/js/vendors.js"></script>';

    const preloadedStateJson = JSON.stringify(preloadedState).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>cera</title>
    </head>
    <body>
        <div id='root'>${html}</div>
        <script>
        </script>

        ${vendorScript}
        <script src="/static/js/main.js" onload="main.ceraMain(${preloadedStateJson});"></script>
        <link href='/static/css/cera.css' rel='stylesheet' >
        </body>
    </html>`;
}

class Routes {
    config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    mainHandler(req, res) {
        const store = createStore(rootReducer);

        const html = renderToString(
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );

        const preloadedState = store.getState();

        res.send(renderFullPage(html, preloadedState, this.config.isProduction));
    }
}

const config = loadConfig(process.env);

const app = express(); // eslint-disable-line new-cap

const routes = new Routes(config);

app.use('/static', express.static(config.staticDir));
app.use(routes.mainHandler.bind(routes));

console.log(`listening on :${config.port}`); // eslint-disable-line no-console
app.listen(config.port);
