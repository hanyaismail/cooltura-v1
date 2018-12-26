import React, {Component} from 'react';

class ToggleSwitch extends Component {
  render() {
    const { checked, onChange } = this.props;
    return (
      <div>
        <label className="switch">
          <input id="fogger1" onChange={onChange} checked={checked} type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    )
  }
}

export default ToggleSwitch;