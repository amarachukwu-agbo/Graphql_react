import React from 'react';
import SingleItem from '../components/SingleItem';

const Item = ({ query: { id } }) => {
  return (
    <div>
      <SingleItem id={id}/>
    </div>
  );
};

export default Item;
