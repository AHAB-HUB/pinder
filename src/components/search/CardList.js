import React from 'react';
import Card from '../search/Card';
import PetDetails from '../search/PetDetails';

function CardList({ pets, images, onPetSelection, isPetSelected, selectedPetPk, onSearchChange, likes, loggedUser }) {
	//console.log(isPetSelected);
	const cards = [];
	const defaultPhotos = [];

	images.map((img, i) => {
		if (images[i].defaultPic) {
			defaultPhotos.push(images[i]);
		}
	});

	defaultPhotos.map((photo, i) => {
		pets.map((pet, j) => {
			if(defaultPhotos[i].pets_id === pets[j].id) {
				cards.push(<Card selectedPetPk={selectedPetPk} onPetSelection={onPetSelection} key={pets[j].id} pk={pets[j].id} img={'http://localhost:4412/api/file/' + defaultPhotos[i].url} name={pets[j].name} description={pets[j].description}/>);
			}
		});
	});

	if (!isPetSelected) {
		return <div>{cards}</div>;
	} else {
		return <PetDetails loggedUser={loggedUser} searchChange={onSearchChange} images={images} pets={pets} likes={likes} selectedPetPk={selectedPetPk} isPetSelected={isPetSelected} onPetSelection={onPetSelection}/>
	}
}

export default CardList;