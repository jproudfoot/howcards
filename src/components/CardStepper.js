import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

/**
 * It is possible to specify your own step connector by passing an element to the `connector`
 * prop. If you want to remove the connector, pass `null` to the `connector` prop.
 */
class CardStepper extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
 
    this.state = {
      stepIndex: 0,
    };
  }

  getStepContent(stepIndex) {
	  return this.props.data[stepIndex].content;
  }

  handleNext() {
    const {stepIndex} = this.state;

    if (stepIndex < (this.props.data.length-1)) {
      this.setState({stepIndex: stepIndex + 1});
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  render() {
    const {stepIndex} = this.state;

	var steps = [];
	for (var x = 0; x < this.props.data.length; x++) {
		steps.push(<Step><StepLabel>{this.props.data[x].title}</StepLabel></Step>);
	}
	
	var nextButton;
	if (stepIndex === (this.props.data.length-1)) {
		nextButton = <RaisedButton label={'Finish'} primary={true} onTouchTap={this.handleNext} />
	}
	else {
		nextButton = <RaisedButton label={'Next'} primary={true} onTouchTap={this.handleNext} />
	}

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
		  {steps}
        </Stepper>

        {this.getStepContent(stepIndex)}

        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
			{nextButton}
        </div>
      </div>
    );
  }
}

export default CardStepper;