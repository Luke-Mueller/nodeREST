import React from 'react';

import './CardDiv.css';

const CardDiv = props => {
  let element;
  if (props.label === 'name') {
    element = (
      <div>
        <h3>{props.value}</h3>
      </div>
    )
  } else {
    element = (
      <div className="CardDiv">
        <p>{props.label}:</p>
        <p>{props.value}</p>
      </div>
    )
  }
  return (
    <div>
      {element}
    </div>
  );
};

export default CardDiv;