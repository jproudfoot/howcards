import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

const style = {
	position: 'absolute',
	left: 'calc(50% - 40px)',
	top: 'calc(50vh - 40px)'
}

class Spinner extends Component {
	render() {
		return(
			<div style={style}>
				<CircularProgress size={80} />
			</div>
		);
	}
}

export default Spinner;