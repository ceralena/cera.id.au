// @flow
/* global console */
/* eslint-disable no-console */
declare var ENV:string;

export function handleError(e: Error) {
    console.log(e);
    if (ENV === 'development') {
        alert('Error: check the console.');
    }
}
