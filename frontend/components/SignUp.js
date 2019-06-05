import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from '../components/ErrorMessage';
import { CURRENT_USER_QUERY } from '../components/User';

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $email: String!,
    $password: String!,
    $name: String!
    ) {
    signUp(
      email: $email,
      password: $password,
      name: $name
      ) {
      email,
      name
    }
  }
`;
export default class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e, signUp) => {
    e.preventDefault();
    await signUp();
    this.setState({
      name: '',
      email: '',
      password: ''
    })

  }
  render() {
    const { email, name, password } = this.state;
    return (
      <Mutation
        mutation={SIGN_UP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signUp, { error, loading }) => (
          <Form method="post" onSubmit={(e) => this.handleSubmit(e, signUp)} >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign Up For An Account</h2>
              <label htmlFor="email">
                Email
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.onChange}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  name="name"
                  type="name"
                  value={name}
                  onChange={this.onChange}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                />
              </label>
              <input type="submit" value="Sign Up"/>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}
