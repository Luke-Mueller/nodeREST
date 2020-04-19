import React from 'react';

import '../styles/forms.css';

const Input = props => {
  let inputElement;
  if (props.type === 'textarea') {
    inputElement = (
      <textarea 
        {...props} />
    );
  } else {
    inputElement = (
      <input 
        {...props} />
    );
  }

  return(
    <div className="Form__div">
      <label htmlFor={props.name}>{props.name}:</label>
      {inputElement}
    </div>
  );
};

export default Input;