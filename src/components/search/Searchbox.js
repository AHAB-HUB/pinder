import React from 'react';

function Searchbox({ searchChange }) {
	return (
		<div className="ma6">
			<input
				style={{outline: 'none'}} 
				className="mw-100 w-100 w5-ns f5 input-reset ba b--black-20 pv3 ph4 border-box tc br-pill mb2 bg-washed-green shadow-1"
				type="search"
				placeholder="Search for pets"
				onChange={searchChange}
			/>
		</div>
	);
}

export default Searchbox;