import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from '../components/ErrorMessage';
import { CURRENT_USER_QUERY } from '../components/User';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!,
    $password: String!,
    $confirmPassword: String!
    $resetToken: String!
    ) {
    resetPassword(
      email: $email,
      password: $password,
      confirmPassword: $confirmPassword
      resetToken: $resetToken
      ) {
      email,
      name
    }
  }
`;
export default class ResetPassword extends Component {
  static propTpes = {
    resetToken: PropTypes.string.isRequired
  }

  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e, resetPassword) => {
    e.preventDefault();
    await resetPassword();
    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    })

  }
  render() {
    const { email, password, confirmPassword } = this.state;
    const { resetToken } = this.props;
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{ ...this.state, resetToken }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { error, loading }) => (
          <Form method="post" onSubmit={(e) => this.handleSubmit(e, resetPassword)} >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
            <h2>Reset Password</h2>
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
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={this.onChange}
                />
              </label>
              <input type="submit" value="Reset Password"/>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}
