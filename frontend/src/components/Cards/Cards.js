import React from 'react';

import Card from './Card/Card';

const Cards = props => {
  const cards = props.artArr.map((i, idx) => {
    return (
      <Card
        data={i}
        artArr={props.artArr}
        setArtArr={props.setArtArr}
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