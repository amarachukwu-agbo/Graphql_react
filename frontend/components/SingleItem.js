import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import styled from 'styled-components';
import { FETCH_ITEM_QUERY } from '../components/UpdateItem';
import ErrorMessage from '../components/ErrorMessage'

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .details {
    margin: 3em;
    font-size: 2rem;
  }
`;
export default class SingleItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <Query query={FETCH_ITEM_QUERY} variables={{id}}>
          {({ error, data: { item }, loading }) => {
            if (error) return <ErrorMessage error={error}/>
            if (loading) return <p>Loading...</p>
            if (!item) return <p>No data found for {`${id}`}</p>
            return (
              <SingleItemStyles>
                <Head>
                  <title> Sick Fits | {item.title} </title>
                </Head>
                <img src={item.largeImage} alt={item.title}/>
                <div className="details">
                  <h2>Viewing {item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </SingleItemStyles>
            )
          }}
        </Query>
      </div>
    )
  }
}
