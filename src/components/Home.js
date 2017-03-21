// @flow
const Profile = () => {
    return (
        <div>
            <h1>cera</h1>
            <p>software engineer | amateur ecologist | revolutionary socialist | synth maker | trans woman</p>

            <p>Hobart, Tasmania</p>
        </div>);
};

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
            <Profile />
            <Contact />
        </div>
    );
}
