import React from 'react';

import CardDiv from './CardDiv/CardDiv';

import './Card.css';

const Card = props => {
  return (
    <div className="Card">
      <CardDiv label="name" value={props.data.name} />
      <CardDiv label="artist" value={props.data.artist} />
      <CardDiv label="description" value={props.data.description} />
      <CardDiv label="width" value={props.data.width} />
      <CardDiv label="height" value={props.data.height} />
      <CardDiv label="date created" value={new Date(props.data.date).toDateString()} />
      <button onClick={() => props.setEditing(props.data)}>Edit</button>
    </div>
  );
};

export default Card;
