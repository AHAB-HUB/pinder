import React from 'react';
import Popup from "reactjs-popup";
import Like from "./Like";
import '../../css/PetDetails.css';

function formatBirthday(birthday) {
	const year = birthday.substring(0, 4);
	const month = birthday.substring(5, 7);
	const day = birthday.substring(8, 10);

	return day + '-' + month + '-' + year;
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function PetDetails({ isPetSelected, onPetSelection, selectedPetPk, images, pets, likes, loggedUser }) {
	//console.log(isPetSelected);

	const pet = pets.find((pet) => pet.id === selectedPetPk);
	const gender = capitalizeFirstLetter(pet.gender);
	const type = capitalizeFirstLetter(pet.type);	
	const birthday = formatBirthday(pet.birthday);
	const petImages = images.filter((img) => img.pets_id === selectedPetPk);


	//console.log(pet);
	//console.log(selectedPetPk);
	//console.log(petLikes);

	const contentStyle = {
	  width: "auto",
	  height: "auto",
	  background: "white",
	};

	let imgs = [];
	petImages.forEach((img) => {
  	imgs.push( 
  		<Popup key={img.url}
		    trigger={<img src={'http://localhost:4412/api/file/' + img.url} className="pointer br-100 h5 w5 dib ba b--near-white pa1" alt="This is an avatar" />}
		    modal
		    contentStyle={contentStyle}>
			    {close => (
			      <div className="modal">
			        <div className="content">
			          <img src={'http://localhost:4412/api/file/' + img.url}/>
			        </div>
			        <div className="actions">
			        	<a className="close" onClick={close}>&times;</a>
			        </div>
			      </div>
			    )}
			  </Popup>
  	);
	})

	return(
		<div>
			<p className='pointer tl pa3' onClick={onPetSelection}>{'<- Back to search'}</p>
			<article className="w-75 bg-washed-green dib br3 ma2 pa4-ns mv3 ba b--black-10 shadow-3 bg-animate hover-bg-light-green">
		  <div className="tl pa3">
		  	<div className="tr pa1"><Like selectedPetPk={selectedPetPk} likes={likes} loggedUser={loggedUser}/></div>
		  	<div className="tc">{imgs}</div>
		    <p className="f4 mb2 dark-grey"><strong>Name: </strong>{pet.name}</p>
		    <p className="f4 mb2 dark-grey"><strong>Type: </strong>{type}</p>
		    <p className="f4 mb2 dark-grey"><strong>Gender: </strong>{gender}</p>
		    <p className="f4 mb2 dark-grey"><strong>Birthday: </strong>{birthday}</p>
		    <p className="f4 mb2 dark-grey ow"><strong>Description: </strong>{pet.description}</p>
		    
		  </div>
		</article>
		</div>
	) 
}

export default PetDetails;