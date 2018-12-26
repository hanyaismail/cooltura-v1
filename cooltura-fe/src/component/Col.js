import React from 'react';

const Col = props => {
  let className = "";

  for (const key in props) {
    console.log(key);
    if(key !== "children") {
      className += `col-${key}-${props[key]} `
    }
  }

  console.log(className);
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default Col;