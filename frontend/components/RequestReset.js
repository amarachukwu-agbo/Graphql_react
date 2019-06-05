import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from '../components/ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION(
    $email: String!,
    ) {
      requestPasswordReset(
      email: $email,
      ) {
      message
    }
  }
`;
export default class RequestReset extends Component {
  state = {
    email: ''
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e, requestReset) => {
    e.preventDefault();
    await requestReset();
    this.setState({
      email: '',
    })

  }
  render() {
    const { email } = this.state;
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
      >
        {(requestPasswordReset, { error, loading, called }) => (
          <Form method="post" onSubmit={(e) => this.handleSubmit(e, requestPasswordReset)} >
            <Error error={error} />
            {!loading && !error && called && <p>Success! Check your email for a reset link</p> }
            <fieldset disabled={loading} aria-busy={loading}>
            <h2>Request Password Reset</h2>
              <label htmlFor="email">
                Email
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.onChange}
                />
              </label>
              <input type="submit" value="Request Reset"/>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}
