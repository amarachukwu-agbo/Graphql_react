import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import RemoveFromCart, { REMOVE_FROM_CART_MUTATION } from '../components/RemoveFromCart';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import { ApolloConsumer } from 'react-apollo';

const fakeUserDetails = fakeUser();
const fakeCartItemDetails = fakeCartItem();
const mocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: { ...fakeUserDetails, cart: [fakeCartItemDetails]  }
      }
    }
  },
  {
    request: {
      query: REMOVE_FROM_CART_MUTATION,
      variables: {id: fakeCartItemDetails.id}
    },
    result: {
      data: {
        removeFromCart: {
          id: fakeCartItemDetails.id,
        }
      }
    }
  }
]

describe('<RemoveFromCart />', () => {
  it('renders correctly and matches snapshot', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <RemoveFromCart id={fakeCartItemDetails.id}/>
    </MockedProvider>);
    await wait();
    wrapper.update();
    expect(wrapper.find('button')).toMatchSnapshot();
  });

  it('removes an item from the cart when clicked', async () => {
    let apolloClient;
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <ApolloConsumer>
        {client => {
          apolloClient = client;
          return <RemoveFromCart id={fakeCartItemDetails.id}/>
        }}
      </ApolloConsumer>
    </MockedProvider>);
    const { data: { me }} = await apolloClient.query({
      query: CURRENT_USER_QUERY
    });
    expect(me.cart.length).toBe(1);
    expect(me.cart[0].item.price).toBe(5000);
    wrapper.find('button').simulate('click');
    await wait(0);
    const { data: { me: updatedUser }} = await apolloClient.query({
      query: CURRENT_USER_QUERY
    });
    expect(updatedUser.cart.length).toBe(0);
  });
});
