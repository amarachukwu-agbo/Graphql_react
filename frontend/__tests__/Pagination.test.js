import { mount } from 'enzyme';
import wait from 'waait';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import Pagination, { PAGINATION_QUERY } from '../components/Pagination';

Router.router = {
  push() {},
  prefetch() {}
}

const makeMocksFor = (length) => {
  const mocks = [
    {
      request: {
        query: PAGINATION_QUERY,
      },
      result: {
        data: {
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              __typename: 'count',
              count: length
            }
          }
        }
      }
    }
  ];
  return mocks;
}
describe('<Pagination />', () => {
  it('renders correctly', () => {
    mount(<MockedProvider mocks={makeMocksFor(2)}>
      <Pagination />
    </MockedProvider>);
  });

  it('displays a loading message', () => {
    const wrapper = mount(<MockedProvider mocks={makeMocksFor(2)} addTypename={false}>
      <Pagination />
    </MockedProvider>);
    expect(wrapper.find('p').text()).toBe('Loading ...');
  });

  it('render pagination for 18 items', async () => {
    const wrapper = mount(<MockedProvider mocks={makeMocksFor(18)} addTypename={false}>
      <Pagination />
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('.totalPages').text()).toEqual('5 !')
    expect(wrapper.find('PaginationStyles')).toMatchSnapshot();
  });

  it('disables previous button on first page', async () => {
    const wrapper = mount(<MockedProvider mocks={makeMocksFor(18)} addTypename={false}>
      <Pagination page={1}/>
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('a.prev').first().prop('aria-disabled')).toEqual(true);
  });

  it('disables next button on last page', async () => {
    const wrapper = mount(<MockedProvider mocks={makeMocksFor(18)} addTypename={false}>
      <Pagination page={5}/>
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('a.prev').last().prop('aria-disabled')).toEqual(true);
  });

  it('enables both buttons on middle page', async () => {
    const wrapper = mount(<MockedProvider mocks={makeMocksFor(18)} addTypename={false}>
      <Pagination page={2}/>
    </MockedProvider>);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('a.prev').last().prop('aria-disabled')).toEqual(false);
    expect(wrapper.find('a.prev').first().prop('aria-disabled')).toEqual(false);
  });
});