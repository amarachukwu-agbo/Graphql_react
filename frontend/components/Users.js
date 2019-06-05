import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS = gql`
  mutation UPDATE_PERMISSIONS($userId: ID!, $permissions: [Permission!]!) {
    updatePermissions(userId: $userId, permissions: $permissions) {
      id
      email
      name
    }
  }
`;

const allPermissions = [
  'ADMIN','USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'
];

export default class Users extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <Error error={error} />
          if (data && data.users) return (
            <div>
              <h2>Manage Account Permissions</h2>
              <Table>
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    {allPermissions.map(permission => <th key={permission}>{permission}</th>) }
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.users.map(user => <UsersData user={user} key={user.id}/>)
                  }
                </tbody>
              </Table>
            </div>
          )
        }}
      </Query>
    )
  }
}

class UsersData extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      permissions: PropTypes.array
    })
  }
  state = {
    permissions: this.props.user.permissions
  }
  handlePermissions = (e, updatePermissions) => {
    let { permissions } = this.state;
    if (e.target.checked) {
      permissions.push(e.target.value)
    } else {
      permissions = permissions.filter(permission => permission  !== e.target.value)
    }
    this.setState({ permissions }, updatePermissions);
  }
  render() {
    const { user } = this.props;
    const { permissions } = this.state;

    return(
      <Mutation mutation={UPDATE_PERMISSIONS} variables={{
        userId: user.id,
        permissions
      }}>
        {(updatePermissions, { error, loading }) => (
          <>
          { error && <tr><td colSpan="8"><Error error={error}/></td></tr>}
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            { allPermissions.map(permission => (
              <td key={permission}>
              <label htmlFor={`${user.id}-permission-${permission}`}>
                <input
                  id={`${user.id}-permission-${permission}`}
                  onChange={(e) => this.handlePermissions(e, updatePermissions)}
                  type="checkbox"
                  value={permission}
                  checked={permissions.includes(permission)}/>
              </label>
              </td>
            ))}
            <td>
              <SickButton
                disabled={loading}
                onClick={updatePermissions}>
                Updat{ loading ? 'ing' : 'e' }
              </SickButton>
            </td>
          </tr>
          </>
        )}
      </Mutation>
    )
  }
}
