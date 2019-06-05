import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Items from '../components/Items';

const AllItems = ({ query }) => (
  <div>
    <Items page={+query.page || 1}/>
  </div>
);

export default AllItems;

