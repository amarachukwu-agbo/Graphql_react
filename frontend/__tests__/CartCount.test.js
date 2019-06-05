import { shallow } from 'enzyme';
import CartCount from '../components/CartCount';

describe('<CartCount />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<CartCount count={2}/>);
    expect(wrapper.length).toBe(1);
  });
  it('matches snapshot', () => {
    const wrapper = shallow(<CartCount count={2}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('updates with the props', () => {
    const wrapper = shallow(<CartCount count={50}/>);
    wrapper.setProps({
      count: 2
    })
    expect(wrapper).toMatchSnapshot();
  });
});