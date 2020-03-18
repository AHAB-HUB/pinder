import React, { Component } from 'react';
import {Link } from 'react-router-dom';

import '../css/Sign_Up_Style.css';

class SignIn extends Component {

  constructor(props){
    super();
    this.state = {
      email:'',
      password:'',
      res: {
        message: '',
        status: false,
        id:null
      },
      style:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    }

    fetch('http://localhost:4412/api/login', {method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json' }})

    .then(res => res.json())
    .then(data =>{
      this.setState({res: data});
      this.props.isLogedIn(this.state.res.status, this.state.res.id);
      console.log(this.state.res.id);
      this.handleMessage(event);
    })
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  handleMessage(event){
    if(this.state.res.status){
      this.setState({style: "green center tc"});
      setTimeout(()=>{
        this.props.history.push('/home/');
      }, 500);
    }
    else {
      this.setState({style: "red center tc"});
    }
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

    render() {
        return (
          <div  className="sign">
            <div className="wrap">
                <h2>Log In</h2>
              <label className={this.state.style}>{this.state.res.message}</label>
                <form onSubmit={this.handleSubmit}>

                    <input name="email" type="email" placeholder="Email"
                      required onChange={this.handleChange}/>
                    <input name="password" type="password" placeholder="Password"
                       required onChange={this.handleChange}/>
                    <input type="submit" value="Log In" />
                    <div className="lh-copy mt3">
                        <Link to="/sign_up" className="f6 link dim white db">Sign up</Link>
                        {/**<Link to="/forget_password"
                          className="f6 link dim white db">Forgot your password?</Link>**/}
                    </div>
                </form>

            </div>
            </div>
        )
    }
}

export default SignIn;
