import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


export const FETCH_ITEM_QUERY = gql`
  query FETCH_ITEM_QUERY($id: ID!) {
    item(where: {
      id: $id
    }) {
      id
      title
      description
      price
      largeImage
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $image: String
    $largeImage: String) {
    updateItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
      }
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`;
export default class UpdateItem extends Component {
  state = {}

  handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    await updateItemMutation();
  }

  render() {
    const { id } = this.props;

    return (
      <Query query={FETCH_ITEM_QUERY} variables={{id}}>
      {({ data, loading }) => {
      if (loading) return <p>Loading ...</p>
      if (!data.item) return <p>{`No item found for id: ${id}`}</p>
      return (
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={{id, ...this.state}}>
      {(updateItem, { loading, error}) => {
        return (
        <Form onSubmit={async (e) => this.updateItem(e, updateItem)}>
          <h2> Sell an item</h2>
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="title">
            Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              defaultValue={data.item.title}
              onChange={this.handleChange}
            />

            <label htmlFor="price">
            Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              required
              defaultValue={data.item.price}
              onChange={this.handleChange}
            />

            <label htmlFor="description">
            Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Enter a description"
              required
              defaultValue={data.item.description}
              onChange={this.handleChange}
            />
            <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
          </fieldset>
        </Form>
      )}}
      </Mutation>
      )
      }}
      </Query>
    )
  }
}
