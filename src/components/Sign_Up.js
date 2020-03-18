import React, { Component } from 'react';
import '../css/Sign_Up_Style.css';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: null,
      style: '',
      res: {
        message: '',
        status: false
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      birthday: this.state.birthday
    }

    fetch('http://localhost:4412/api/createUser', {
      method: 'POST',

      body: JSON.stringify(data), // data can be `string` or {object}!

      headers: { 'Content-Type': 'application/json' }
    })

      .then(res => res.json())

      .then(data => {

        this.setState({ res: data });
        console.log("Message %s ", this.state.res.message);
        this.handleMessage(event);
      })

      .catch(error => console.error('Error:', error))

      .then(response => console.log('Success:', response));


  }

  handleMessage(event) {
    if (this.state.res.status) {
      this.setState({ style: "green center tc" });
      this.props.isLogedIn(this.state.res.status);
      setTimeout(() => {
        this.props.history.push('/home/');
      }, 3000);
    }
    else {
      this.setState({ style: "red center tc" });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleDate = date => {
    try {
      this.setState({ birthday: date });
    } catch (e) {
      this.setState({ birthday: null });
      console.log(e);
    }
  }

  render() {

    return (
      <div className="sign">
      <div className="wrap">
        <h2>Sign Up</h2>
        <label className={this.state.style}>{this.state.res.message}</label>
        <form onSubmit={this.handleSubmit}>

          <input name="firstName" type="text" placeholder="First Name"
            required onChange={this.handleChange} />
          <input name="lastName" type="text" placeholder="Last Name"
            required onChange={this.handleChange} />
          <input name="email" type="email" placeholder="Email"
            required onChange={this.handleChange} />
          <input name="password" type="password" minLength="8"
            placeholder="Password" onChange={this.handleChange} required />
          <input name="confirmPassword" type="password" minLength="8"
            placeholder="Confirm Password" onChange={this.handleChange} required />
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={this.state.birthday}
            onChange={this.handleDate}
            placeholderText="Birthday"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            withPortal
          />

          <input type="submit" value="Submit" />
        </form>

      </div>

      </div>
    )
  }
}

export default SignUp;
