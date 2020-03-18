import React from 'react';
import Call from '../assets/icons/call_icon.png';
import Mail from '../assets/icons/mail_icon.png';
import Github from '../assets/icons/github_icon.png';

const Contact = () => {
    return (
        <div className="contact">
            <h2 className="center tc">Contact Us</h2>
            <div className="flex justify-around mt3">
                <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <div className="tc">
                        <img src="http://localhost:4412/api/file/nawar.jpg"
                          className="br-100 h3 w3 dib"
                          title="Photo of a kitty staring at you" alt="Nawar" />
                        <h1 className="f4">Nawar Aghi</h1>
                        <h4 className="f4">Software Developer</h4>
                        <hr className="mw3 bb bw1 b--black-10" />
                    </div>
                    <p className="lh-copy measure center f6 black-70">

                        <img className="mr2 mt2 " src={Call} alt="call" />
                        +46762983544
                        <br />
                        <img className="mr2 mt2 " src={Mail} alt="mail"/>
                        <a href="mailto:nawaraghi@gmail.com">Nawar Aghi</a>
                        <br />
                        <img className="mr2 mt2 " src={Github} alt="github" />
                        <a href="https://github.com/NawarAghi">Nawar Aghi</a>
                    </p>
                </article>

                <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <div className="tc">
                        <img src="http://localhost:4412/api/file/nuno.jpg" className="br-100 h3 w3 dib"
                          title="Photo of a kitty staring at you" alt="Nuno"/>
                        <h1 className="f4">Nuno Cunha</h1>
                        <h4 className="f4">Software Developer</h4>
                        <hr className="mw3 bb bw1 b--black-10" />
                    </div>
                    <p className="lh-copy measure center f6 black-70">
                        <img className="mr2 mt2 " src={Call} alt="call"/>
                        +46707249511
                        <br />
                        <img className="mr2 mt2 " src={Mail} alt="mail"/>
                        <a href="mailto:nawaraghi@gmail.com">Nuno Cunha</a>
                        <br />
                        <img className="mr2 mt2 " src={Github} alt="github"/>
                        <a href="https://github.com/iamnuno">Nuno Cunha</a>
                    </p>
                </article>

                <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <div className="tc">
                        <img src="http://localhost:4412/api/file/ahmad.png" className="br-100 h3 w3 dib"
                          title="Photo of a kitty staring at you" alt="Ahmad"/>
                        <h1 className="f4">Ahmad Abdulal</h1>
                        <h4 className="f4">Software Developer</h4>
                        <hr className="mw3 bb bw1 b--black-10" />
                    </div>
                    <p className="lh-copy measure center f6 black-70">
                        <img className="mr2 mt2 " src={Call} alt="call"/>
                        +46764143711
                        <br />
                        <img className="mr2 mt2 " src={Mail} alt="mail"/>
                        <a href="mailto:ahmadabdulal@outlook.com">Ahmad Abdulal</a>
                        <br />
                        <img className="mr2 mt2 " src={Github} alt="github"/>
                        <a href="https://github.com/AHAB-HUB">Ahmad Abdulal</a>
                    </p>
                </article>

            </div>

        </div>
    )
}

export default Contact;
