import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import SignUp, { SIGN_UP_MUTATION } from '../components/SignUp';
import { fakeUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import { ApolloConsumer } from 'react-apollo';

const fakeUserDetails = fakeUser();
const mocks = [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: {
        email: fakeUserDetails.email,
        password: 'lkkihudzv',
        name: fakeUserDetails.name
      }
    },
    result: {
      data: {
        signUp: fakeUserDetails
      }
    }
  },
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: fakeUserDetails
      }
    }
  }
];

describe('<SignUp />', () => {
  it('renders correctly and matches snapshot', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <SignUp />
    </MockedProvider>);
    expect(wrapper.find('Form')).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    let apolloClient;
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <ApolloConsumer>
        { client => {
          apolloClient=client;
          return <SignUp />
        }}
      </ApolloConsumer>
    </MockedProvider>);
    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        value: "lkkihudzv",
        name: "password"
      }
    });
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        value: fakeUserDetails.email,
        name: "email"
      }
    });
    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        value: fakeUserDetails.name,
        name: "name"
      }
    });
    wrapper.update();
    wrapper.find('form').simulate('submit');
    await wait();
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(fakeUserDetails);
  });
});
