import React, { useState } from 'react';
import axios from 'axios';

import FormInput from '../../util/FormInput/FormInput';

import '../../../styles/forms.css';

const URI = `${process.env.REACT_APP_API_URL}`;

const Card = props => {
  const [name, setName] = useState(props.data.name);
  const [artist, setArtist] = useState(props.data.artist);
  const [description, setDescription] = useState(props.data.description);
  const [width, setWidth] = useState(props.data.width);
  const [height, setHeight] = useState(props.data.height);
  const [date, setDate] = useState(props.data.date);
  const [changed, setChanged] = useState(false);

  const deleteHandler = e => {
    const id = props.data.id;
    axios.delete(`${URI}/app/${id}`)
      .then(res => {
        alert(res.data.message);
        props.setArtArr(prevArr => {
          const newArr = prevArr.filter(i => i.id !== id);
          return newArr;
        });
      })
      .catch(err => console.log('Delete artwork failed ', err));
    e.preventDefault();
  };

  const updateHandler = e => {
    const id = props.data.id;
    const payload = JSON.stringify({
      name: name,
      artist: artist,
      width: width,
      height: height,
      date: date,
      description: description
    });

    axios.put(`${URI}/app/${id}`, { payload })
      .then(res => alert(res.data.message))
      .catch(err => console.log(err))
    e.preventDefault();
  };

  let updateBtn;
  changed ?
    updateBtn = <button onClick={updateHandler}>update</button> :
    updateBtn = <button onClick={updateHandler} disabled>update</button>

  return (
    <form className="Form">
      <FormInput
        name="name"
        type="text"
        value={name}
        onChange={e => {
          setName(e.target.value);
          setChanged(true);
        }} />
      <FormInput
        name="artist"
        type="text"
        value={artist}
        onChange={e => {
          setArtist(e.target.value);
          setChanged(true);
        }} />
      <FormInput
        name="width"
        type="number"
        value={width}
        onChange={e => {
          setWidth(e.target.value);
          setChanged(true);
        }} />
      <FormInput
        name="height"
        type="number"
        value={height}
        onChange={e => {
          setHeight(e.target.value);
          setChanged(true);
        }} />
      <FormInput
        name="date"
        type="date"
        value={date.substring(0, 10)}
        onChange={e => {
          setDate(e.target.value);
          setChanged(true);
        }} />
      <FormInput
        name="description"
        type="textarea"
        value={description}
        rows="5"
        onChange={e => {
          setDescription(e.target.value)
          setChanged(true);
        }} />
      {updateBtn}
      <button onClick={deleteHandler}>delete</button>
    </form>
  );
};

export default Card;