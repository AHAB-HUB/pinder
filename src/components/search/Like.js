import React from 'react';
import Popup from "reactjs-popup";
import empty from '../../assets/icons/heart_empty.png';
import  full from '../../assets/icons/heart_full.png';


function makeLike(loggedUser, selectedPetPk, comment) {
	console.log(loggedUser, selectedPetPk);

	fetch('http://localhost:4412/api/likes/', {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	    users_id: loggedUser,
	    pets_id: selectedPetPk,
	    comment: comment
	  })
	})
}

function Like({ likes, loggedUser, selectedPetPk }) {

	const thisPetLikes = likes.filter((like) => like.pets_id === selectedPetPk);
	const likedThisPet = thisPetLikes.filter((like) => like.users_id === loggedUser);

	console.log(likedThisPet);

	const [comment, setComment] = React.useState('');

	function handleClick() {
		makeLike(loggedUser, selectedPetPk, comment);
	}

	if (!likedThisPet.length) {
		return (
				<Popup
    			trigger={<img className="pointer" style={{width: '5%'}} src={empty} alt="" />}
    			modal
    			closeOnDocumentClick>
    			<form className="pa4 black-80">
					  <div>
					    <label for="comment" className="f6 b db mb2 tl">Send a comment</label>
					    <textarea onChange={e => setComment(e.target.value)} onid="comment" name="comment" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
					    <div className="tc"><a onClick={handleClick} className="f6 link dim br-pill ba ph3 pv2 mb2 dib black" href="#0">Comment</a></div>
					  </div>
					</form>
  			</Popup>
		)
	} else {
		return <img style={{width: '5%'}} src={full} alt="" />
	}
}

export default Like;