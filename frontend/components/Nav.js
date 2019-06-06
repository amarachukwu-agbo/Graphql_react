import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from '../components/User';
import SignOut from '../components/SignOut';
import CartCount from '../components/CartCount';
import { TOGGLE_CART_MUTATION } from '../components/Cart';

const Nav = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {(toggleCart) => (
      <User>
        {({ data: { me }}) => (
          <NavStyles>
            <Link href="/allitems">
              <a>Shop</a>
            </Link>
            {
              me && (
                <>
                  <Link href="/sell">
                    <a>Sell!</a>
                  </Link>
                  <Link href="/orders">
                    <a>Orders</a>
                  </Link>
                  <Link href="/me">
                    <a>Account</a>
                  </Link>
                  <SignOut />
                  <button onClick={toggleCart}>
                    My Cart
                    <CartCount
                      count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}
                    />
                  </button>
                </>
              )
            }
            {
              !me && (
                <Link href="/signup">
                  <a>Sign In</a>
                </Link>
              )
            }
      </NavStyles>
        )}
      </User>
    )}
  </Mutation>
);

export default Nav;
