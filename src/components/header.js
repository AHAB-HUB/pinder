import React, { Component } from 'react';
import 'tachyons';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';

class Header extends Component {

  componentDidMount() {
  }

  signOut = () => {
  }

  render() {

    let profile = (this.props.status) ? <Link to="/profile" className="link dim white f6 f5-l dib mr3 mr4-l" title="Profile">Profile</Link> : null;

    return (
      <nav className="db dt-l w-100 border-box pa3 ph5-l" style={{ "backgroundImage": 'linear-gradient(rgba(175,171,171,0.7), rgba(96,98,106, 0.3) )' }}>
        <Link to="/home" className="db dtc-l v-mid mid-gray link w-100 w-25-l tc tl-l mb2 mb0-l cursor">
          <img src={logo} className=" dib w2 h2 br-100" alt="logo" title="Pinder"></img>
        </Link>
        <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
          <Link to="/home" className="link dim white f6 f5-l dib mr3 mr4-l" title="Home">Home</Link>
          {profile}
          <Link to="/about" className="link dim white f6 f5-l dib mr3 mr4-l" title="About">About</Link>
          <Link to="/contact-us" className="link dim white f6 f5-l dib mr3 mr4-l" title="Contact Us">Contact Us</Link>
          <Link to="/sign_in" className="link dim white f6 f5-l dib mr3 mr4-l" title="Log" >{(this.props.status) ? "Sign out" : "Sign in"}</Link>
        </div>
      </nav>
    );
  }
}

export default Header;