import { mount } from 'enzyme';
import wait from 'waait';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem';
import { fakeItem } from '../lib/testUtils';

Router.router = {
  push: jest.fn(),
}

const dogImage = 'dog-small.jpg';

global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }]
  })
})
const fakeCreateItem = fakeItem();

const mocks = [
  {
    request: {
      query: CREATE_ITEM_MUTATION,
      variables: {
        title: fakeCreateItem.title,
        description: fakeCreateItem.description,
        image: fakeCreateItem.image,
        largeImage: fakeCreateItem.largeImage,
        price: fakeCreateItem.price,
      }
    },
    result: {
      data: {
        createItem: {
          ...fakeCreateItem,
        }
      }
    }
  }
];

describe('<CreateItem />', () => {
  it('renders correctly and matches snapshot', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <CreateItem />
    </MockedProvider>);
    expect(wrapper.find('Form')).toMatchSnapshot();
  });

  it('uploads file input', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <CreateItem />
    </MockedProvider>);
    wrapper.find('input[type="file"]').simulate('change', {
      target: {
        files: ['fakeDog.jpg']
      }
    });
    await wait(0);
    const createItemState = wrapper.find('CreateItem').instance().state;
    expect(createItemState.image).toBe(dogImage);
    expect(createItemState.largeImage).toBe(dogImage);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('handles state updating', () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <CreateItem />
    </MockedProvider>);
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        value: fakeCreateItem.title,
        name: "title"
      }
    });
    wrapper.find('input[name="price"]').simulate('change', {
      target: {
        value: fakeCreateItem.price,
        name: "price"
      }
    });
    wrapper.find('textarea[name="description"]').simulate('change', {
      target: {
        value: fakeCreateItem.description,
        name: "description"
      }
    });
    const createItemState = wrapper.find('CreateItem').instance().state;
    expect(createItemState).toMatchObject({
      title: fakeCreateItem.title,
      price: fakeCreateItem.price,
      description: fakeCreateItem.description,
    });
  });

  it('runs the mutation when form is submitted', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <CreateItem />
    </MockedProvider>);
    wrapper.find('input[type="file"]').simulate('change', {
      target: {
        files: ['fakeDog.jpg']
      }
    });
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        value: fakeCreateItem.title,
        name: "title"
      }
    });
    wrapper.find('input[name="price"]').simulate('change', {
      target: {
        value: fakeCreateItem.price,
        name: "price",
        type: "number"
      }
    });
    wrapper.find('textarea[name="description"]').simulate('change', {
      target: {
        value: fakeCreateItem.description,
        name: "description"
      }
    });
    await wait(0);
    wrapper.find('form').simulate('submit');
    await wait(50);
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push)
      .toHaveBeenCalledWith({"pathname": "/item", "query": {"id": "abc123"}});
    global.fetch.mockReset();
  });
});
