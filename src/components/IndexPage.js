import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HeaderBar from './HeaderBar'
import Viewport from './Viewport'

var MediaQuery = require('react-responsive');

const IndexPage = () => (
	<MuiThemeProvider>
		<div>
			<HeaderBar />
		
			<MediaQuery minDeviceWidth={1224}>
				<MediaQuery maxWidth={690}>
					{(matches) => {
	    				if (matches) {
	      				 	return <Viewport mobile={true} />;
	    			  	} else {
							return <Viewport mobile={false} />;
	    			   	}
					}}
        		</MediaQuery>
        	</MediaQuery>
						
        	<MediaQuery maxDeviceWidth={1224}>
          		return <Viewport mobile={true} />;
        	</MediaQuery>
		</div>
	</MuiThemeProvider>
);

export default IndexPage;