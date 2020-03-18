import React, { Component } from 'react';
import pet from '../../data/Pets.js';
import { Redirect } from 'react-router-dom';
import client from '../../data/RestClient.js';

import 'tachyons';
 
class NewPetContainer extends Component {

  state = {
    submitDisabled: true,
    file: null
  };

  registerPet = (event) => {
    event.preventDefault();

    if (this.cancel.innerText === "Cancel"){
      this.setState({
        toProfile:true
      })
    }
 //   image:this.state.file,
    client.newPet(
      {name:this.name,
      birthday:this.date,
      gender:(this.male.checked) ? 'Male' : 'Female',
      description:this.desc,
      users_id:1,//ADD user ID
      type:(this.cat.checked) ? 'Cat' : 'Dog'
    },this.state.file)

    //send data to database
  }

  mockImage=()=>{
    return (
      <div className="pa3 dt  center">
        <img src={this.state.file} className="br-100 h4 w4 objectFit-cover  shadow-1-l " alt='pic' />
      </div>
    );
  }

  formHandler = () => {
    let i = (this.image.files[0])? URL.createObjectURL(this.image.files[0]) : null;

    if (!this.name.value | !Date.parse(this.date.value) | (!this.dog.checked && !this.cat.checked) | (!this.female.checked && !this.male.checked) | !this.image.value) {
      this.setState({
        submitDisabled: true,
        file: i
      });
    } else {
      this.setState({
        submitDisabled: false,
        file: i,
        toProfile:false
      });
    }
  }

  render() {
    if (this.state.toProfile === true) {
      return <Redirect to='/profile' />
    }

    let mockImage = (this.state.file == null)? <div /> : this.mockImage();

    return (
      <div className="absolute w-100 h-100 left-top bright-gray z-5">
        <div className="bg-light-gray center w-50 pv4 relative mt6-ns br2 flex flex-column ">
          <h1 className="center">New  Pet </h1>
          {mockImage}
          <form className="flex flex-column tc" onSubmit={this.registerPet}>

            <div className="ml4 pv3 tl">Select a profile picture</div>
            <input className="ml4" ref={(form) => { this.image = form }} type="file" onChange={this.formHandler} />

            <div className="mt3 w-50 center">
              <div className="bb">  Name</div>
              <input ref={(form) => { this.name = form }} className="mt2 w-100 " type="text" onChange={this.formHandler} />
            </div>
            <div className="mt3 w-50 center">
              <div className="bb">Birthday</div>
              <input ref={(form) => { this.date = form }} className="mt2 w-100" type="date" onChange={this.formHandler} />
            </div>
            <div className=" mt3 w-50 center">
              <div className="bb">Pet</div>
              <div className="mt2">
                <input ref={(form) => { this.cat = form }} className="mr1" type="radio" id="cat" name="type" value="cat" onChange={this.formHandler} />
                <label htmlFor="cat">Cat</label>
                <input ref={(form) => { this.dog = form }} className="ml3 mr1" type="radio" id="dog" name="type" value="dog" onChange={this.formHandler} />
                <label htmlFor="dog">Dog</label>
              </div>
            </div>
            <div className=" mt3 w-50 center">
              <div className="bb">Gender</div>
              <div className="mt2">
                <input ref={(form) => { this.male = form }} className="mr1" type="radio" id="male" name="gender" value="male" onChange={this.formHandler} />
                <label htmlFor="male">Male</label>
                <input ref={(form) => { this.female = form }} className="ml3 mr1" type="radio" id="female" name="gender" value="female" onChange={this.formHandler} />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <div className="pt3">
              <input className="fr w-20 mr5" type="submit" value="Save" disabled={this.state.submitDisabled} />
              <button ref={(form) => { this.cancel = form }} className="fl w-20 ml5">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewPetContainer;