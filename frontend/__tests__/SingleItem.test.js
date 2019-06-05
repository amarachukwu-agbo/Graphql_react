import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import wait from 'waait';
import { fakeItem } from '../lib/testUtils';
import { FETCH_ITEM_QUERY } from '../components/UpdateItem';
import SingleItem from '../components/SingleItem';

const mocks = [{
  request: {
    query: FETCH_ITEM_QUERY,
    variables: {
      id: '123'
    }
  },
  result: {
    data: {
      item: fakeItem()
    }
  }
}]

describe('<SingleItem />', () => {
  it('renders correctly', () => {
    mount(<MockedProvider mocks={mocks}>
      <SingleItem id="123"/>
    </MockedProvider>);
  });

  it('renders loading when the data is still being fetched', () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <SingleItem id="123"/>
    </MockedProvider>);
    expect(wrapper.find('p').text()).toBe('Loading...');
  });

  it('renders the data when it is fetched', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <SingleItem id="123"/>
    </MockedProvider>);
    expect(wrapper.find('p').text()).toBe('Loading...');
    await wait(0);
    wrapper.update();
    expect(wrapper.find('h2')).toMatchSnapshot();
    expect(wrapper.find('img')).toMatchSnapshot();
    expect(wrapper.find('p')).toMatchSnapshot();
  });

  it('renders error when error is returned', async () => {
    const newMocks = [{...mocks[0], result: {errors: [{message:  'No item found'}]}}];
    const wrapper = mount(<MockedProvider mocks={newMocks}>
      <SingleItem id="123"/>
    </MockedProvider>);
    expect(wrapper.find('p').text()).toBe('Loading...');
    await wait(0);
    wrapper.update();
    expect(wrapper.find('[data-test]').text()).toBe('Shoot!No item found');
  });
});
