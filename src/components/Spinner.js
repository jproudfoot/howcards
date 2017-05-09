import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

const style = {
	width: '100%',
	paddingLeft: 'calc(50% - 40px)',
	paddingTop: 'calc(50vh - 100px)'
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