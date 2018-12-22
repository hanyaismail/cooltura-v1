import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToFogger, emitFogger, connectionSocket } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    connectionSocket((err, data) => {
      console.log(data)
    })
    subscribeToFogger((err, data) => {
      console.log(data)
      this.setState({inputChecked: Boolean(data.state)})
    });
  }

  state = {
    inputChecked: false,
    response: false,
  }

  // componentDidMount() {
  //   this.socket.on("news", data => {
  //     console.log('data', data);
  //     this.setState({response: data});
  //   })
  // }

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <input 
          type="checkbox"
          checked={this.state.inputChecked}
          onChange={this.toggleChange}
        />
      </div>
    );
  }
}

export default App;
