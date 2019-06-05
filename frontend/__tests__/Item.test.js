import { shallow } from 'enzyme';
import Item from '../components/Item';

const props = {
  item: {
    image: 'https://res.cloudinary.com/amara/sic-fits/dog.png',
    title: 'A chihuahua dog',
    id: 'ctruinb198338',
    price: 500000,
    description: 'A beautiful chihuahua dog'
  }
}
describe('<Item />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Item {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
});