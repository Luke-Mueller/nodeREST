import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from '../util/FormInput/FormInput';

import '../util/styles/forms.css';

const URI = `${process.env.REACT_APP_API_URL}`;

const EditForm = props => {
  const [name, setName] = useState(props.data.name);
  const [description, setDescription] = useState(props.data.description);
  const [changed, setChanged] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      (name !== '' || description !== '') && 
      (name !== props.data.name || description !== props.data.description) &&
      changed
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    };
  }, [
    name, 
    description, 
    changed,
    props.data.description,
    props.data.name
  ]);

  const deleteHandler = e => {
    const result = window.confirm(
      `Are you sure you want to delete ${props.data.name}?`
    );
    if (result) {
      const id = props.data.id;
      axios.delete(`${URI}/app/${id}`)
        .then(res => {
          props.setEditing(false);
          alert(res.data.message);
          props.setArtArr(prevArr => {
            const newArr = prevArr.filter(i => i.id !== id);
            return newArr;
          });
        })
        .catch(err => console.log('Delete artwork failed ', err));
    }; 
    e.preventDefault();
  };

  const updateHandler = e => {
    const id = props.data.id;
    const payload = JSON.stringify({
      name: name,
      description: description
    });

    axios.put(`${URI}/app/${id}`, { payload })
      .then(res => {
        props.setEditing(false);
        alert(res.data.message);
      })
      .catch(err => console.log(err))
    e.preventDefault();
  };

  let updateBtn;
  changed ?
    updateBtn = <button onClick={updateHandler}>UPDATE</button> :
    updateBtn = <button onClick={updateHandler} disabled>UPDATE</button>

  return (
    <form className="Form">
      <h3 className="Form__h3">UPDATE ART</h3>
      <FormInput
        name="name"
        type="text"
        validated={isValid}
        value={name}
        onChange={e => {
          setName(e.target.value);
          setChanged(true);
        }} />
      <FormInput
        name="description"
        type="textarea"
        validated={isValid}
        value={description}
        rows="5"
        onChange={e => {
          setDescription(e.target.value);
          setChanged(true);
        }} />
      <button onClick={() => props.setEditing(false)}>CANCEL</button>
      {updateBtn}
      <button onClick={deleteHandler}>DELETE</button>
    </form>
  );
};

export default EditForm;
