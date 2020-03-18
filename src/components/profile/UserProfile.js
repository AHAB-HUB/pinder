import React, { Component } from 'react';
import editIcon from '../../assets/icons/edit.png';
import user from '../../data/User.js';
import NewPetContainer from './NewPetContainer.js';
import add from '../../assets/icons/add.png';
import cancel from "../../assets/icons/delete.png";
import Swiper from 'react-id-swiper';
import client from '../../data/RestClient.js';
import '../../css/index.css';
import 'tachyons';
import "tachyons-word-break";
import 'swiper/css/swiper.css';
import ReactLoading from "react-loading";

class UserProfile extends Component {

  state = {
    userLabels: ['Name', 'Email', 'Birthday', 'Password'],
    petsLabels: ['Name', 'Birthday', 'Type', 'Gender'],
    edit: false,
    pets: [],
    activeProfile: 'ahmad',
    showPetContainer: false,
    loading: true,
    id: this.props.id
  };

  componentDidMount(time=1000) {
    // if(this.state.id)
    setTimeout(() => {
      client.getAccount(1)
        .then(res =>
          this.setState({
            user: new user(res["0"].firstName, res["0"].lastName, "decs", res["0"].email, res["0"].birthday, res["0"].password, res["picture"], res["0"].id),
            pets: res["pets"],
            activeProfile: res["0"].firstName + " " + res["0"].lastName,
            loading: false
          })
        )
    }, time);
  }

  generateTable = (labels, profile) => {
    const items = []

    for (const [index, value] of labels.entries()) {
      items.push(
        <div key={value} className="ph2-ns">
          <div className="fl w-40 w-100-m pv3">
            <div className="bb">{value}</div>
          </div>
          <div className="fr w-50 w-100-m pv3">
            <div ref={(row) => { this[value] = row }} contentEditable={this.state.edit} suppressContentEditableWarning={true} className="bb tc" >
              {profile[value.toLowerCase()]} </div>
          </div>
        </div>)
    }

    return (
      <div className="mw9 center w-80 cf tc word-wrap mv4 bg-white br4">
        {items}
      </div>
    )
  }

  editable = (edit, save) => {

    if (edit) {
      this.save.style.top = "45px";
      this.cancel.style.top = "80px";

      this.setState({
        edit: true
      });
    } else {
      this.save.style.top = "10px";
      this.cancel.style.top = "10px";
      
      this.setState({
        edit: false
      });
      if (save) {
        
        if (this.state.activeProfile === this.state.user.name) {
          var name = this.Name.innerHTML.split(' ',2);
          client.update(true,
             {
               id:this.state.user.id,
               firstName:name[0],
               lastName:name[1],
               birthday:this.Birthday.innerHTML,
               email:this.Email.innerHTML,
               password:this.Password.innerHTML
             });
        } else {
          for (let index = 0; index < this.state.pets.length; index++) {

            if (this.state.activeProfile === this.state.pets[index].name){
              client.update(false,
                {
                  id:this.state.pets[index].id,
                  name:this.Name.innerHTML,
                  description:this.desc.innerHTML,
                  birthday:this.Birthday.innerHTML,
                  type:this.Type.innerHTML,
                  gender:this.Gender.innerHTML
                });
            }
          }
        }
      }
      this.componentDidMount(0);
    }
  }

  generateSideSlide = () => {
    const items = [];
    var i = 0;

    if (this.state.activeProfile !== this.state.user.name)
      items.push(<img key={this.state.user.id} onClick={() => this.changeProfile(this.state.user.name)} className=" slide-icon absolute ba bw1 shadow-1-l  br-100" style={{ top: (60 * (i++)) + "px" }} src={"http://localhost:4412/api/file/" + this.state.user.picture} alt={this.state.user.name} title={this.state.user.name} />);

    for (const [index, value] of this.state.pets.entries()) {

      if (this.state.activeProfile !== value.name) {
        items.push(
          <img key={value.name} onClick={() => this.changeProfile(value.name)} className=" objectFit-cover slide-icon absolute br-100 ba bw1 shadow-1-l" style={{ top: (60 * i) + "px" }} src={"http://localhost:4412/api/file/" + value.picture[0]} alt={value.name} title={value.name} />
        )
        i++;
      }
    }
    items.push(
      <img key={"add"} onClick={() => this.changeProfile("add", true)} className="objectFit-cover slide-icon br-100  bw1 absolute shadow-1-l" style={{ top: (60 * (i)) + "px" }} src={add} alt="add new pet" title="Add new pet" />
    );
    return (
      <div className="profile-slide absolute overflow-hidden">
        {items}
      </div>
    )
  }

  changeProfile = (name, show = false) => {

    if (name === "add") {
      this.setState({ showPetContainer: show });
      return;
    }

    this.setState({
      activeProfile: name
    });
  }

  profileGallery = (img) => {

    const params = { // properties for Swiper
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        rebuildOnUpdate: true,
        clickable: true,
        dynamicBullets: true,
      },
      shouldSwiperUpdate: true,
      mousewheel: {},
      spaceBetween: 12
    }

    const items = [];

    for (const [index, value] of img.entries()) {

      items.push(
        <div key={index} className="pa3 mv2">
          <img src={"http://localhost:4412/api/file/" + value} className="shadow-1 br-100 objectFit-cover" alt={value.name} />
        </div>
      );
    }

    return (
      <div className="center w-50-m w-25-l">
        <Swiper {...params}>

          {items}

        </Swiper>
      </div>
    );
  }

  render() {
    let desc;
    let pic;
    var grid;
    let PetContainer = (this.state.showPetContainer) ? <NewPetContainer /> : null;


    if (!this.state.loading) {

      if (this.state.activeProfile === this.state.user.name) {
        desc = this.state.user.description;
        pic = this.profileGallery(this.state.user.picture);
        grid = this.generateTable(this.state.userLabels, this.state.user);
      } else {
        for (const [index, value] of this.state.pets.entries()) {
          if (this.state.activeProfile === value.name) {
            desc = value.description;
            pic = this.profileGallery(value.picture);
            grid = this.generateTable(this.state.petsLabels, value);
            break;
          }
        }
      }
    }

    if (this.state.loading) {
      return (<ReactLoading className="center  pt7" type={"bars"} color={"white"} />);
    } else {

      return (
        <div className="h-100">

          <div className="center w-50 mt5-ns br2 relative container-color pv2" >
            {/*side-slide*/}
            {this.generateSideSlide()}
            {/*edit-slide*/}
            <div className="absolute dc">
              <img src={editIcon} onClick={() => this.editable(true)} className="w2 h2 absolute edit-icon overflow-hidden br-100  objectFit-cover" style={{ top: '10px', zIndex: 1 }} alt="profile" title="Edit" />
              <img ref={(input) => { this.save = input }} onClick={() => this.editable(false, true)} src="https://www.kindpng.com/picc/m/80-807690_check-mark-well-icon-internet-circle-good-correct.png" className="w2 h2 objectFit-cover absolute edit-icon overflow-hidden br-100" style={{ top: '10px' }} alt="save" title="save" />
              <img ref={(input) => { this.cancel = input }} onClick={() => this.editable(false)} src={cancel} className="objectFit-cover w2 h2 absolute edit-icon overflow-hidden br-100" style={{ top: '10px' }} alt="cancel" title="cancel" />
            </div>

            {pic}

            <div ref={(input) => { this.desc = input }} className="center mt1-ns mv2-ns bg-white pa2 br4 word-wrap tc" style={{ maxWidth: "70%", textAlign: "center" }} contentEditable={this.state.edit} suppressContentEditableWarning={true}>{desc}</div>
            <div className="center w-80 bg-black" style={{ height: "1px" }}></div>

            {grid}
          </div>
          {PetContainer}
        </div>
      );
    }

  }
}

export default UserProfile;