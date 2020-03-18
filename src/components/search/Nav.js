import React from 'react';
import '../../css/Nav.css';

function Nav() {
	return (
		<div className="pb3">
			<nav className="db dt-l w-100 border-box pa3 ph5-l shadow-1">
				<h3 className="pr2 pl2 drak-gray custom-font">Pinder</h3>
			  <a className="db dtc-l v-mid mid-gray link w-100 w-25-l tc tl-l mb2 mb0-l" href="#" title="Home">
			    <img src="./pinder.jpg" className="dib w2 h2 br-100" alt="Site Name"/>
			  </a>
			  <div className="db dtc-l v-mid w-100 tc tr-l">
			    <a className="link grow dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Home">Home</a>
			    <a className="link grow dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Your Pets">Your Pets</a>
			    <a className="link grow dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="About Pinder">About Pinder</a>
			  </div>
			</nav>
		</div>
	);
}

export default Nav;