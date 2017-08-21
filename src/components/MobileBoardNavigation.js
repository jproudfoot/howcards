import React, {Component} from 'react';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';


const recommendedIcon = <FontIcon className="material-icons">lightbulb_outline</FontIcon>;
const publicIcon = <FontIcon className="material-icons">public</FontIcon>;
const favoriteIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const personalIcon = <FontIcon className="material-icons">person</FontIcon>;
const deckIcon = <FontIcon className="material-icons">layers</FontIcon>;

class MobileBoardNavigation extends Component {
  	constructor(props){
		super(props);
		
		this.state = {selectedIndex: 0}
		this.select = this.select.bind(this);
	};
	
	select(index) {
		this.setState({selectedIndex: index});
		this.props.handler(index);
	}
	
    render() {
		if (this.props.loggedIn){
       return (
         <Paper zDepth={2}>
           <BottomNavigation selectedIndex={this.state.selectedIndex}>
             <BottomNavigationItem
               icon={recommendedIcon}
               onTouchTap={() => this.select(0)}
             />
             <BottomNavigationItem
               icon={publicIcon}
               onTouchTap={() => this.select(1)}
             />
             <BottomNavigationItem
               icon={favoriteIcon}
               onTouchTap={() => this.select(2)}
             />
             <BottomNavigationItem
               icon={deckIcon}
               onTouchTap={() => this.select(3)}
             />
			 <BottomNavigationItem
               icon={personalIcon}
               onTouchTap={() => this.select(4)}
             />
           </BottomNavigation>
		</Paper>
	  );
  		}
		else {
	        return (
	          <Paper zDepth={2}>
	            <BottomNavigation selectedIndex={this.state.selectedIndex}>
	              <BottomNavigationItem
	                icon={recommendedIcon}
	                onTouchTap={() => this.select(0)}
	              />
	              <BottomNavigationItem
	                icon={publicIcon}
	                onTouchTap={() => this.select(1)}
	              />
	              <BottomNavigationItem
	                icon={deckIcon}
	                onTouchTap={() => this.select(3)}
	              />
	            </BottomNavigation>
	 		</Paper>
	 	  );
		}
	}
}

export default MobileBoardNavigation;