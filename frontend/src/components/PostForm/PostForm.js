import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from '../util/FormInput/FormInput';

import '../util/styles/forms.css';

const URI = `${process.env.REACT_APP_API_URL}`;

const PostForm = props => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [date, setDate] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [artistIsValid, setArtistIsValid] = useState(false);
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [widthIsValid, setWidthIsValid] = useState(false);
  const [heightIsValid, setHeightIsValid] = useState(false);
  const [dateIsValid, setDateIsValid] = useState(false);
  const [validated, setValidated] = useState('false');

  useEffect(() => {
    const re = /^([0-2]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

    name !== '' ? setNameIsValid(true) : setNameIsValid(false);
    artist !== '' ? setArtistIsValid(true) : setArtistIsValid(false);
    description !== '' ? setDescriptionIsValid(true) : setDescriptionIsValid(false);
    width !== '' ? setWidthIsValid(true) : setWidthIsValid(false);
    height !== '' ? setHeightIsValid(true) : setHeightIsValid(false);
    re.test(date) ? setDateIsValid(true) : setDateIsValid(false);
    
    let formIsValid = 'false';
    if (
      nameIsValid &&
      artistIsValid &&
      descriptionIsValid &&
      widthIsValid &&
      heightIsValid &&
      dateIsValid
    ) formIsValid = 'true';
  
    setValidated(formIsValid);
  }, [
    name, 
    artist, 
    description, 
    width, 
    height, 
    date, 
    nameIsValid,
    artistIsValid,
    descriptionIsValid,
    widthIsValid,
    heightIsValid,
    dateIsValid
  ]);

  const submitHandler = e => {
    const payload = JSON.stringify({
      name: name,
      artist: artist,
      description: description,
      width: width,
      height: height,
      date: date
    });

    axios.post(`${URI}`, { payload })
      .then(res => {
        props.setArtArr(prevArr => {
          return prevArr.concat(res.data.payload);
        });
        alert('Art added successfully');
      })
      .catch(() => alert('Adding art failed'))
      .finally(() => {
        setName('');
        setArtist('');
        setDescription('');
        setHeight('');
        setWidth('');
        setDate('');
      });

    e.preventDefault();
  };

  let postBtn;
  validated ?
    postBtn = <button type="submit">ADD</button> :
    postBtn = <button type="submit" disabled>ADD</button>;

  return (
    <form className="Form" onSubmit={submitHandler}>
      <h3 className="Form__h3">ADD ART</h3>
      <FormInput
        name="name"
        type="text"
        validated={nameIsValid ? 'true' : undefined}
        value={name}
        onChange={e => setName(e.target.value)} />
      <FormInput
        name="artist"
        type="text"
        value={artist}
        validated={artistIsValid ? 'true' : undefined}
        onChange={e => setArtist(e.target.value)} />
      <FormInput
        name="width"
        type="number"
        validated={widthIsValid ? 'true' : undefined}
        value={width}
        onChange={e => setWidth(e.target.value)} />
      <FormInput
        name="height"
        type="number"
        validated={heightIsValid ? 'true' : undefined}
        value={height}
        onChange={e => setHeight(e.target.value)} />
      <FormInput
        name="date"
        type="date"
        validated={dateIsValid ? 'true' : undefined}
        value={date}
        onChange={e => setDate(e.target.value)} />
      <FormInput
        name="description"
        type="textarea"
        validated={descriptionIsValid ? 'true' : undefined}
        value={description}
        rows="5"
        onChange={e => setDescription(e.target.value)} />
      {postBtn}
    </form>
  )
};

export default PostForm;
