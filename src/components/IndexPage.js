import React, { Component } from 'react';

import HeaderBar from './HeaderBar'
import Viewport from './Viewport'

var MediaQuery = require('react-responsive');

class IndexPage extends Component {
	constructor (props) {
		super(props);
	}
	
	render() {
		
		return (
			<div>
			
				<MediaQuery minDeviceWidth={1224}>
					<MediaQuery maxWidth={690}>
						{(matches) => {
	    					if (matches) {
	      				 		return <div><HeaderBar mobile={true} user={this.props.user}/><Viewport user={this.props.user} mobile={true} /></div>;
	    			  		} else {
								return <div><HeaderBar mobile={false} user={this.props.user}/><Viewport user={this.props.user} mobile={false} /></div>;
	    			   		}
						}}
        			</MediaQuery>
        		</MediaQuery>
						
        		<MediaQuery maxDeviceWidth={1224}>
          			return <div><HeaderBar mobile={true} user={this.props.user}/><Viewport user={this.props.user} mobile={true} /></div>;
        		</MediaQuery>
			</div>
		)
	}
}

export default IndexPage;