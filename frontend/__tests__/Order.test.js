import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import Order, { SINGLE_ORDER_QUERY } from '../components/Order';
import { fakeOrder } from '../lib/testUtils';

jest.mock('next/router', ()=> ({push: jest.fn()}))


const fakeOrderDetails = fakeOrder();

const mocks = [
  {
    request: {
      query: SINGLE_ORDER_QUERY,
      variables: {
        id: fakeOrderDetails.id
      }
    },
    result: {
      data: {
        order: fakeOrderDetails
      }
    }
  }
];

describe('<Order />', () => {
  it('renders correctly and matches snapshot', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <Order orderId={fakeOrderDetails.id}/>
    </MockedProvider>);
    await wait();
    wrapper.update();
    expect(wrapper.find('OrderStyles')).toMatchSnapshot();
  });

});
