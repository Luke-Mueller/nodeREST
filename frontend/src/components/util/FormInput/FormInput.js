import React from 'react';

import '../styles/forms.css';

const Input = props => {
  let inputElement;
  let style;

  if (props.validated) {
    style = { 'border-color': '#ccc' }
  }

  if (props.type === 'textarea') {
    inputElement = (
      <textarea
        className="Form__textarea"
        style={style}
        {...props} />
    );
  } else {
    inputElement = (
      <input
        className="Form__input"
        style={style}
        {...props} />
    );
  }

  return (
    <div className="Form__div">
      <label htmlFor={props.name}>{props.name}:</label>
      {inputElement}
    </div>
  );
};

export default Input;