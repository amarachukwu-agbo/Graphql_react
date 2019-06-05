import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from '../components/ErrorMessage';
import { CURRENT_USER_QUERY } from '../components/User';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION(
    $email: String!,
    $password: String!,
    ) {
    signIn(
      email: $email,
      password: $password,
      ) {
      email
    }
  }
`;
export default class SignIn extends Component {
  state = {
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
        mutation={SIGN_IN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signUp, { data, error, loading }) => (
          <Form method="post" onSubmit={(e) => this.handleSubmit(e, signUp)} >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign into your account</h2>
              <label htmlFor="email">
                Email
                <input
                  name="email"
                  type="email"
                  value={email}
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
              <input type="submit" value="Sign In"/>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}
