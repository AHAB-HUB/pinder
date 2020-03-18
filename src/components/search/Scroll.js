import React from 'react';
import '../../css/Scroll.css';

function Scroll({ children }) {
	return (
		<div className="scroll">
			{children}
		</div>
	)
}

export default Scroll;