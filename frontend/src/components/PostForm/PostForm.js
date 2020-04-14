import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from '../util/FormInput/FormInput';
import '../../styles/forms.css';

const URI = `${process.env.REACT_APP_API_URL}`;

const PostForm = props => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [date, setDate] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // FORM VALIDATION
    let v1;
    let v2;
    const re = /^([0-2]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

    if (
      name !== '' &&
      artist !== '' &&
      description !== '' &&
      width !== '' &&
      height !== ''
    ) {
      v1 = true;
    } else {
      v1 = false;
    };

    if (re.test(date)) {
      v2 = true;
    } else {
      v2 = false;
    };

    const result = (v1 === true && v2 === true);
    setValidated(result);
  }, [name, artist, description, width, height, date]);

  const submitHandler = e => {
    const payload = JSON.stringify({
      name: name,
      artist: artist,
      description: description,
      width: width,
      height: height,
      date: date
    });

    axios.post(`${URI}/app`, { payload })
      .then(res => {
        if (res.status !== 201) {
          throw new Error('Error');
        }
        console.log('PL: ', res.data.payload)
        props.setArtArr(prevArr => {
          return prevArr.concat(res.data.payload)
        });
        alert('Art added successfully');
      })
      .catch(err => {
        console.log('Adding art failed: ', err);
      })
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
    postBtn = <button type="submit" disabled>ADD</button>

  return (
    <form className="Form" onSubmit={submitHandler}>
      <h3 className="Form__h3">ADD ART</h3>
      <FormInput 
        name="name" 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} />
      <FormInput 
        name="artist" 
        type="text" 
        value={artist} 
        onChange={e => setArtist(e.target.value)} />
      <FormInput 
        name="width" 
        type="number" 
        value={width} 
        onChange={e => setWidth(e.target.value)} />
      <FormInput 
        name="height" 
        type="number" 
        value={height} 
        onChange={e => setHeight(e.target.value)} />
      <FormInput 
        name="date" 
        type="date" 
        value={date} 
        onChange={e => setDate(e.target.value)} />
      <FormInput 
        name="description" 
        type="textarea" 
        value={description} 
        rows="5" 
        onChange={e => setDescription(e.target.value)} />
      {postBtn}
    </form>
  )
};

export default PostForm;