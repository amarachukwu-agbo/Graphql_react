import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Router from 'next/router';

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;
export default class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  }

  handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  }

  uploadImage = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    const res = await fetch('https://api.cloudinary.com/v1_1/ama-hello-books-v2/image/upload', {
      method: 'POST',
      mode: 'cors',
      body: data
    });
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  }
  render() {
    const { title, price, description, image } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      {(createItem, { loading, error}) => (
        <Form onSubmit={async (e) => {
          e.preventDefault();
          const res = await createItem();
          Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id}
          });
        }}>
          <h2> Sell an item</h2>
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="file">
            File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              placeholder="Upload an image"
              required
              onChange={this.uploadImage}
            />
            {
              image && <img src={image} alt="uploaded image" width="50px"/>
            }
            <label htmlFor="title">
            Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              value={title}
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
              value={price}
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
              value={description}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
      </Mutation>
    )
  }
}
