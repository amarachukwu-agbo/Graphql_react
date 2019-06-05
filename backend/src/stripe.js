import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config({
  path: 'variables.env'
});

export default stripe(process.env.STRIPE_SECRET);
