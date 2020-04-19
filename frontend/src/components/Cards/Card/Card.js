import React from 'react';

import CardDiv from './CardDiv/CardDiv';

import './Card.css';

const Card = props => {

  const utc = new Date(props.data.date).toUTCString();
  const utcArr = utc.split(' ');
  const dateArr = [];  
  
  dateArr[0] = utcArr[0];
  dateArr[1] = utcArr[2];
  dateArr[2] = utcArr[1];
  dateArr[3] = utcArr[3];

  const date = dateArr.join(' ');

  return (
    <div className="Card">
      <CardDiv label="name" value={props.data.name} />
      <CardDiv label="artist" value={props.data.artist} />
      <CardDiv label="description" value={props.data.description} />
      <CardDiv label="width" value={props.data.width} />
      <CardDiv label="height" value={props.data.height} />
      <CardDiv label="date created" value={date} />
      <button onClick={() => props.setEditing(props.data)}>EDIT</button>
    </div>
  );
};

export default Card;
