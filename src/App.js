import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import UserProfile from './components/profile/UserProfile';
import SignIn from './components/Sign_In';
import SignUp from './components/Sign_Up';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';


import 'tachyons';

class App extends Component {

  state = {
    logIn: false,
    uid: null
  }

  isLogedIn = (status, id = null) => {
    this.setState({
      logIn: status,
      uid: id
    });
  }

  render() {

    return (
      <Router>
        <div>
          <Header isLogedIn={this.isLogedIn} status={this.state.logIn} />
          <Switch>
            <Route path="/profile" render={(props) => <UserProfile {...props}  id={this.state.uid} />} />
            <Route exact path="/home" render={(props) => <Home {...props} id={this.state.uid} />} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact-us" component={Contact} />
            <Route exact path="/sign_in" render={(props) => <SignIn {...props} isLogedIn={this.isLogedIn} />} />
            <Route exact path="/sign_up" render={(props) => <SignUp {...props} isLogedIn={this.isLogedIn} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;