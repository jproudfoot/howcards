import React, { Component } from 'react';
import { Link } from 'react-router';

import { Motion, spring } from 'react-motion';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Tooltip from 'material-ui/internal/Tooltip'

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';

import NewCardIcon from 'material-ui/svg-icons/content/add-box';
import NewDeckIcon from 'material-ui/svg-icons/av/queue';

const style = {
	actionButton: {
		position: 'absolute',
		
		right: '10px',
		bottom: '70px'
	},
	subButtonInitial: {
		position: 'absolute',
		
		right: '18px',
		bottom: '78px'
	},
	subButtonFinalCard: {
		position: 'absolute',
		
		right: '18px',
		bottom: '190px'
	},
	subButtonFinalDeck: {
		position: 'absolute',
		
		right: '18px',
		bottom: '140px'
	},
	showCardTooltip: {
		position: 'absolute',
		
		right: '125px',
		bottom: '243px'
	},
	showDeckTooltip: {
		position: 'absolute',
		
		right: '125px',
		bottom: '193px'
	},
	hideTooltip: {
		position: 'absolute',
		
		right: '125px',
		bottom: '130px'
	}
}

class ActionButton extends Component {
	constructor(props) {
		super(props);
		
		this.state = {selected: false};
		
		this.select = this.select.bind(this);
	}
	
	select() {
		this.setState({selected: !this.state.selected});
	}
	
	mainButtonStyles() {
	    return {
			position: 'absolute',
			right: '10px',
			bottom: '70px'
	    };
	}
	
	render() {
		var actionButton;
		if (this.props.loggedIn) {
			let currentStyleCard = this.state.selected ? style.subButtonFinalCard : style.subButtonInitial;
			let currentStyleDeck = this.state.selected ? style.subButtonFinalDeck : style.subButtonInitial;
			
			var buttonContent;
			var tooltips;
			if (this.state.selected) {
				buttonContent =
					<Motion defaultStyle={{x: 0}} style={{x: spring(135, { stiffness: 500, damping: 30})}}>
						{value =>
							<ContentAdd style={{color: 'white', transform: 'rotate(' + value.x + 'deg)'}}/>
						}
					</Motion>
				
				tooltips = 
					<div>
						<Motion defaultStyle={{y: -63}} style={{y: spring(0, { stiffness: 500, damping: 30})}}>
						{value =>
							<div>
								<Link to={'/create/deck'} style={{ textDecoration: 'none' }}><div style={style.showDeckTooltip}><div style={{position: 'relative', bottom: value.y}}><Tooltip show={true} label="Add Deck" /></div></div></Link>
								<Link to={'/create/card'} style={{ textDecoration: 'none' }}><div style={style.showCardTooltip}><div style={{position: 'relative', bottom: value.y}}><Tooltip show={true} label="Add Card" /></div></div></Link>
							</div>
						}
						</Motion>
					</div>
			}
			else {
				buttonContent =
					<Motion style={{x: spring(0, { stiffness: 500, damping: 30})}}>
						{value =>
							<ContentAdd style={{color: 'white', transform: 'rotate(' + value.x + 'deg)'}}/>
						}
					</Motion>
						
					tooltips = 
						<div>
							<div style={style.hideTooltip}><Tooltip show={false} label="Add Deck" /></div>
							<div style={style.hideTooltip}><Tooltip show={false} label="Add Card" /></div>
						</div>
			}
			
			return(
				<div>
					<FloatingActionButton style={currentStyleDeck} mini={true} secondary={true} href='/create/deck'><NewDeckIcon /></FloatingActionButton>
					<FloatingActionButton style={currentStyleCard} mini={true} secondary={true} href='/create/card'><NewCardIcon /></FloatingActionButton>
				
					{tooltips}
				
					<FloatingActionButton style={style.actionButton} onTouchTap={this.select} zDepth={3}>
						<div>{buttonContent}</div>
					</FloatingActionButton>	
					
				</div>
			);
		}
		else {
			return (<div></div>);
		}
	}
}

export default ActionButton;