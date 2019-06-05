import Link from 'next/link';
import CreateItem from '../components/CreateItem';
import Auth from '../components/Auth';

const Sell = () => (
  <Auth>
    <CreateItem />
  </Auth>
);

export default Sell;
