import React from 'react';

import CardDiv from './CardDiv/CardDiv';

import './Card.css';

const Card = props => {

  let date = new Date(props.data.date)
    .toUTCString()
    .split(' ')
    .slice(0, 4);
    
  const idx2 = date[2];
  date[2] = date[1];
  date[1] = idx2;
  date = date.join(' ');

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
