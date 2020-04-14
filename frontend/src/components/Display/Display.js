import React, { useState } from 'react';
import axios from 'axios';

import Cards from '../Cards/Cards';

const URI = `${process.env.REACT_APP_API_URL}`;

const Display = props => {
  const [error, setError] = useState('');
  // const [touched, setTouched] = useState(false);

  const getHandler = () => {
    axios.get(`${URI}/app`)
      .then(res => {
        const newArr = res.data.payload;
        if (!newArr.length) {
          setError('The database is empty');
        } else {
          setError('');
          // setTouched(true);
        };
        props.setArtArr(newArr);
        // setTouched(true);
      })
      .catch(err => console.log(err));
  };

  const show = () => {
    console.log('artArr: ', props.artArr);
  }

  // let getBtn;
  // touched ?
  //   getBtn = <button onClick={getHandler} disabled>Get</button> :
  //   getBtn = <button onClick={getHandler}>Get</button>;

  // let getBtn;
  // !props.artArr.length ?
  //   getBtn = <button onClick={getHandler} disabled>Get</button> :
  //   getBtn = <button onClick={getHandler}>Get</button>;

  return (
    <section className="Display">
      <button onClick={show}>artArr</button>
      <button onClick={getHandler}>Get</button>
      <p>{error}</p>
      <Cards 
        artArr={props.artArr} 
        setArtArr={props.setArtArr} />
    </section>
  );
};

export default Display;
