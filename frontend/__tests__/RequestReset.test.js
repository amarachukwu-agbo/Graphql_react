import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset';

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: {email: 'test@gmail.com'}
    },
    result: {
      data: {
        requestPasswordReset: {
          __typename: 'message',
          message: 'Request token sent successfully'
        }
      }
    }
  }
];

describe('<RequestReset />', () => {
  it('renders correctly and matches snapshot', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <RequestReset />
    </MockedProvider>);
    expect(wrapper.find('Form')).toMatchSnapshot();
  });

  it('calls the mutation when form is submitted', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <RequestReset />
    </MockedProvider>);
    wrapper.find('input').first().simulate('change', {
      target: {
        value: 'test@gmail.com',
        name: "email"
      }
    });
    wrapper.find('form').simulate('submit');
    await wait(0);
    wrapper.update();
    expect(wrapper.find('p').text()).toContain('Success! Check your email for a reset link');
  });
});
