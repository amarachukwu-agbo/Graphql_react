import { mount } from 'enzyme';
import wait from 'waait';
import NProgress from 'nprogress';
import { MockedProvider } from 'react-apollo/test-utils';
import Cart, { LOCAL_STATE_QUERY, CREATE_ORDER } from '../components/Cart';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import Router from 'next/router';

jest.mock('next/router', ()=> ({push: jest.fn()}))


const fakeUserDetails = fakeUser();
const fakeCart = fakeCartItem();
const mocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: { ...fakeUserDetails, cart: [fakeCart]  }
      }
    }
  },
  {
    request: {
      query: LOCAL_STATE_QUERY,
    },
    result: {
      data: {
        cartOpen: true
      }
    }
  }
];

describe('<Cart />', () => {
  it('renders correctly and matches snapshot', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <Cart />
    </MockedProvider>);
    await wait();
    wrapper.update();
    expect(wrapper.find('header')).toMatchSnapshot();
    expect(wrapper.find('CartItem').length).toBe(1);
    expect(wrapper.find('ReactStripeCheckout')).toMatchSnapshot();
  });

  it('creates an order', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: {
        createOrder: {
          id: '234444'
        }
      }
    });
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <Cart />
    </MockedProvider>);
    wrapper.find('Cart').instance().onToken({id: 'abc123'}, createOrderMock);
    expect(createOrderMock).toHaveBeenCalled();
    expect(createOrderMock).toHaveBeenCalledWith({
      variables: {
        token: 'abc123',
      }
    });
  });

  it('starts NProgress when order is created', async () => {
    NProgress.start = jest.fn();
    const createOrderMock = jest.fn().mockResolvedValue({
      data: {
        createOrder: {
          id: '234444'
        }
      }
    });
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <Cart />
    </MockedProvider>);
    wrapper.find('Cart').instance().onToken({id: 'abc123'}, createOrderMock);
    expect(NProgress.start).toHaveBeenCalled();
  });

  it('routes to the order page after a component is created', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: {
        createOrder: {
          id: '234444'
        }
      }
    });
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <Cart />
    </MockedProvider>);
    wrapper.find('Cart').instance().onToken({id: 'abc123'}, createOrderMock);
    await wait();
    expect(Router.push).toHaveBeenCalled();
  });
});
