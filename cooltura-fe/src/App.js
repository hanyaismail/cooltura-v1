import React, { Component } from 'react';
import './App.css';
import { ToggleSwitch } from './component';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Schedule from './ui/Schedule';
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
        <Schedule />
        <Schedule />
      </div>
    );
  }
}

export default App;
