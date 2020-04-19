import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Cards from '../Cards/Cards';

const URI = `${process.env.REACT_APP_API_URL}`;

const Display = props => {
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show && props.artArr.length) {
      setError('');
    } else if (show && !props.artArr.length) {
      setError('The database is empty');
    }
  }, [show, props.artArr])

  const getHandler = () => {
    axios.get(`${URI}/app`)
      .then(res => {
        const newArr = res.data.payload;
        if (!newArr.length) {
          setError('The database is empty');
        } else {
          setError('');
          setShow(true);
        };
        props.setArtArr(newArr);
        setShow(true);
      })
      .catch(err => console.log(err));
  };

  const hideListHandler = () => {
    props.setArtArr([]);
    setShow(false);
    setError('');
  };

  let getBtn;
  let body;
  if (show) {
    getBtn = <button onClick={hideListHandler}>HIDE LIST</button>;
    body = (
      <Cards
        artArr={props.artArr}
        setArtArr={props.setArtArr}
        setEditing={props.setEditing} />
    );
  } else {
    getBtn = <button onClick={getHandler}>GET LIST</button>;
    body = null;
  };

  return (
    <section className="Display">
      {getBtn}
      <p>{error}</p>
      {body}
    </section>
  );
};

export default Display;
