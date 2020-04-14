import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Cards from '../Cards/Cards';

const URI = `${process.env.REACT_APP_API_URL}`;

const Display = props => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched && props.artArr.length) {
      setError('');
    } else if (touched && !props.artArr.length) {
      setError('The database is empty');
    }
  }, [touched, props.artArr])

  const getHandler = () => {
    axios.get(`${URI}/app`)
      .then(res => {
        const newArr = res.data.payload;
        if (!newArr.length) {
          setError('The database is empty');
        } else {
          setError('');
          setTouched(true);
        };
        props.setArtArr(newArr);
        setTouched(true);
      })
      .catch(err => console.log(err));
  };

  const hideListHandler = () => {
    props.setArtArr([]);
    setTouched(false);
    setError('');
  };

  let getBtn;
  touched ?
    getBtn = <button onClick={hideListHandler}>Hide List</button> :
    getBtn = <button onClick={getHandler}>Get List</button>;

  return (
    <section className="Display">
      {getBtn}
      <p>{error}</p>
      <Cards 
        artArr={props.artArr} 
        setArtArr={props.setArtArr} />
    </section>
  );
};

export default Display;
