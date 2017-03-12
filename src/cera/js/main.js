import Inferno from 'inferno';

const message = 'hello world';

export const ceraMain = () => {
    const elem = document.getElementById('main');

    Inferno.render(
        <p>{message}</p>,
        elem
    );
};
