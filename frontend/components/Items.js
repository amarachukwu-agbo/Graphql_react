import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';


export const ITEMS_QUERY = gql`
  query ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}){
    items(skip: $skip, first: $first) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
`;

export default class Items extends Component {
  render() {
    const { page } = this.props;
    return (
      <Center>
      <Query query={ITEMS_QUERY} variables={{
        skip: (page - 1) * perPage
      }}>
        {({ error, loading, data }) => {
          if (loading) return <p>Loading... </p>
          if (error) return <p>{`Error: ${error.message}`}</p>
          console.log(data, 'data =====');
          return data.items.length ? (
            <div>
              <Pagination page={page}/>
              <ItemsList>
                {
                  data.items.map(item => <Item key ={item.id} item={item}/>)
                }
              </ItemsList>
              <Pagination page={page}/>
            </div>
          ) : <p>No items have been created :(</p>
        }}
      </Query>
      </Center>
    )
  }
}
