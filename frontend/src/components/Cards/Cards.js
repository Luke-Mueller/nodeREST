import React from 'react';

import Card from './Card/Card';

const Cards = props => {
  const cards = props.artArr.map(i => {
    return (
      <Card
        data={i}
        artArr={props.artArr}
        setArtArr={props.setArtArr}
        setEditing={props.setEditing}
        key={i.id} />
    );
  });

  return (
    <ul className="Cards">
      {cards}
    </ul>
  );
};



export default Cards;