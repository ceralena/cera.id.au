// @flow
import React from 'react';

import {render} from '../utils/markdown';

const text = `
# cera

software engineer | amateur ecologist | revolutionary socialist | synth maker | trans woman

Hobart, Tasmania
`;

const Contact = () => {
    return  (
        <div className='contact'>
            <i className='fa fa-transgender' aria-hidden='true'></i>
            <a href='https://github.com/ceralena'><i className='fa fa-github' aria-hidden='true'></i></a>
            <a href='https://www.instagram.com/cerales'><i className='fa fa-instagram' aria-hidden='true'></i></a>
            <a href='http://soundcloud.com/cerales'><i className='fa fa-soundcloud' aria-hidden='true'></i></a>
        </div>
    );
};

export default function Home() {
    return (
        <div className='home'>
            {render(text)}
            <Contact />
        </div>
    );
}
