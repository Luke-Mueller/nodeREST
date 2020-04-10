import React, { useState } from 'react';
import axios from 'axios';

import Cards from '../Cards/Cards';

const URI = `${process.env.REACT_APP_API_URL}`;

const Display = props => {
  const [error, setError] = useState('');

  const getHandler = () => {
    axios.get(`${URI}/app`)
      .then(res => {
        const newArr = res.data.payload;
        if (!newArr.length) {
          setError('The database is empty');
        } else {
          setError('');
        }
        props.setArtArr(newArr);
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="Display">
      <button onClick={getHandler}>Get</button>
      <p>{error}</p>
      <Cards 
        artArr={props.artArr} 
        setArtArr={props.setArtArr} />
    </section>
  );
};

export default Display;
