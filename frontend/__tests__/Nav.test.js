import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const signedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: fakeUser()
      }
    }
  }
];

const signedInMocksWithCartItems = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()]
        }
      }
    }
  }
];

const notSignedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: null
      }
    }
  }
];

describe('<Nav />', () => {
  it('renders a minimal Nav when signed out', async () => {
    const wrapper = mount(<MockedProvider mocks={notSignedInMocks}>
      <Nav />
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('NavStyles')).toMatchSnapshot();
  });

  it('renders the full Nav to logged in users', async () => {
    const wrapper = mount(<MockedProvider mocks={signedInMocks}>
      <Nav />
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('NavStyles')).toMatchSnapshot();
  });

  it('renders the amount of items in cart', async () => {
    const wrapper = mount(<MockedProvider mocks={signedInMocks}>
      <Nav />
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('NavStyles')).toMatchSnapshot();
  });
});
