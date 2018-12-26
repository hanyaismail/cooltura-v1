import React from 'react';

const Box = props => {
  return (
    <div style={{...props}}>
      {props.children}
    </div>
  )
}

export default Box;