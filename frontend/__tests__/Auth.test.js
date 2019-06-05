import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import Auth from '../components/Auth';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

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
]
describe('<Auth />', () => {
  it('renders the sign in component to logged out users', async () => {
    const wrapper = mount(<MockedProvider mocks={notSignedInMocks}>
      <Auth />
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('SignIn').exists()).toBe(true);
  });

  it('renders the children component to logged in users', async () => {
    const wrapper = mount(<MockedProvider mocks={signedInMocks}>
      <Auth>
        <div>I am signed In</div>
      </Auth>
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('SignIn').exists()).toBe(false);
  })

});
