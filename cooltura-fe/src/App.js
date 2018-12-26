import React, { Component } from 'react';
import './App.css';
import { ToggleSwitch, Box, Row, Col } from './component';
import { subscribeToFogger, emitFogger, connectionSocket } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    // connectionSocket((err, data) => {
    //   console.log(data)
    // })
    // subscribeToFogger((err, data) => {
    //   console.log(data)
    //   this.setState({inputChecked: Boolean(data.state)})
    // });
  }

  state = {
    inputChecked: false,
    response: false,
  }

  toggleChange = e => {
    console.log('e', e.target.checked)
    const { checked } = e.target;
    this.setState({inputChecked: checked})
    // this.socket.emit('fogger', {state: Number(checked)})
    emitFogger(checked);
  }

  render() {
    return (
      <div className="App">
        <Box
          color="red"
          background="red"
        >
          <Row>
            {/* <Col md="4" xs="12"> */}
              <p>Test</p>
            {/* </Col> */}
            {/* <Col md="4" xs="12"> */}
              <ToggleSwitch 
                checked={this.state.inputChecked}
                onChange={this.toggleChange}
              />
            {/* </Col> */}
            {/* <Col md="4" xs="12"> */}
              <input 
                type="checkbox"
                checked={this.state.inputChecked}
                onChange={this.toggleChange}
              />
            {/* </Col> */}
          </Row>
        </Box>
      </div>
    );
  }
}

export default App;
