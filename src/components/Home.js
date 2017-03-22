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
    const links = [
        {url: 'mailto:ceralena.davies@gmail.com', icon: 'fa-envelope-o'},
        {url: 'https://github.com/ceralena', icon: 'fa-github'},
        {url: 'https://www.instagram.com/cerales', icon: 'fa-instagram'},
        {url: 'http://soundcloud.com/cerales', icon: 'fa-soundcloud'}
    ];

    const linkElements = links.map(link => {
        const cl = `fa ${link.icon}`;

        return (
            <a href={link.url}>
                <i className={cl} aria-hidden='true'>
                </i>
            </a>
        );
    });

    return  (
        <div className='contact'>
            <i className='fa fa-transgender' aria-hidden='true'></i>
            {linkElements}
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
