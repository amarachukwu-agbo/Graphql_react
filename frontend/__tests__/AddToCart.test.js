import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import AddToCart, { ADD_TO_CART_MUTATION } from '../components/AddToCart';
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
        me: { ...fakeUserDetails, cart: []  }
      }
    }
  },
  {
    request: {
      query: ADD_TO_CART_MUTATION,
      variables: {id: fakeCartItemDetails.id}
    },
    result: {
      data: {
        addToCart: {
          ...fakeCartItemDetails,
          quantity: 1
        }
      }
    }
  },
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
];

describe('<AddToCart />', () => {
  it('renders correctly and matches snapshot', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <AddToCart id={fakeCartItemDetails.id}/>
    </MockedProvider>);
    await wait();
    wrapper.update();
    expect(wrapper.find('button')).toMatchSnapshot();
  });

  it('adds an item to cart when clicked', async () => {
    let apolloClient;
    const wrapper = mount(<MockedProvider mocks={mocks}>
    <ApolloConsumer>
      {client => {
        apolloClient = client;
        return <AddToCart id={fakeCartItemDetails.id}/>
      }}
    </ApolloConsumer>
    </MockedProvider>);
    const { data: { me }} = await apolloClient.query({
      query: CURRENT_USER_QUERY
    });
    expect(me.cart.length).toBe(0);
    wrapper.find('button').simulate('click');
  });

  it('changes the button text based on the loading state', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <AddToCart id={fakeCartItemDetails.id}/>
      </MockedProvider>);
    await wait();
    wrapper.update();
    expect (wrapper.text()).toContain('Add To Cart');
    wrapper.find('button').simulate('click');
    expect (wrapper.text()).toContain('Adding To Cart');
  });
});
