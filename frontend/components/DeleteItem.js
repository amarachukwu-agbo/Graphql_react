import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
      title
    }
  }
`;

export default class DeleteItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }
  update(cache, payload) {
    const { items } = cache.readQuery({ query: ITEMS_QUERY });
    const requiredItems = items
      .filter(item => item.id !== payload.data.deleteItem.id)
    cache.writeQuery({ query: ITEMS_QUERY, data: { items: requiredItems } })
  }
  render() {
    const { id, children } = this.props;
    return (
      <Mutation mutation={DELETE_ITEM_MUTATION}
        variables={{id}}
        update={this.update}
        >
      {(deleteItem) => {
        return (
          <button onClick={() => {
            if (confirm('Are you sure you want to delete this item')) {
              deleteItem().catch(err => alert(err));
            }
          }}>
            { children }
          </button>
        )
      }}
      </Mutation>
    )
  }
}
