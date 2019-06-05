import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import stripe from '../stripe';
import { promisify } from 'util';
import { mailTemplate, mailTransport } from '../mail';
import hasPermission from '../utils';

const mutations = {
  async createItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to create an item');
    }
    const item = await ctx.db.mutation.createItem({
      data: {
      ...args,
      user: {
        connect: {
          id: ctx.request.userId
        }
      }
    }
  });
    return item;
  },
  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateItem({
      data: args.data,
      where: args.where
    }, info)
  },
  async deleteItem(parent, args, ctx, info) {
    const { id } = args;
    const item = await ctx.db.query.item({
      where: {
        id
      }
    }, `{id user {id}}`);
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermission = ctx.request.user.permissions
      .some(permission => ['ADMIN', 'ITEMDELETE'].includes(permission));
    if(!ownsItem || !hasPermission) {
      throw new Error('You don\'t have the permission to delete this item');
    }
    return ctx.db.mutation.deleteItem({
      where: {
        id
      }
    })
  },
  async signUp(parent, args, ctx, info) {
    const emailToLower = args.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        email: emailToLower,
        password: hashedPassword,
        permissions: { set: ['USER']}
      }
    });

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },
  async signIn(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where:  { email }});
    if (!user) {
      throw new Error(`User with email ${email} was not found`);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid password!');
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },

  signOut(parent, args, ctx) {
    ctx.response.clearCookie('token');
    return { message : 'User successfuly logged out' }
  },

  async requestPasswordReset(parent, { email }, ctx) {
    const user = await ctx.db.query.user({ where:  { email }});
    if (!user) {
      throw new Error('User does not exist!');
    }
    const promisifiedCrypto = promisify(randomBytes);
    const resetToken = (await promisifiedCrypto(20)).toString('hex');
    await ctx.db.mutation.updateUser({
      data: {
        resetToken,
        resetTokenExpiry: Date.now() + 3600000
      },
      where: {
        email
      }
    });

    await mailTransport.sendMail({
      from: "Amarachukwu Agbo <amarkipkip@gmail.com>",
      to: user.email,
      subject: 'Your passowrd reset token',
      html: mailTemplate(`Your password reset token is here !!!
      \n\n Click on the <a href=${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}>link</a> to reset password;`)
    });
    return { message: 'Success! Check your email for a reset link'}
  },

  async resetPassword(_, { email, password, confirmPassword, resetToken }, ctx) {
    // check if user exists and token is valid
    const [isValid] = await ctx.db.query.users({
      where: {
        email,
        resetToken,
        resetTokenExpiry_gt: Date.now() - 3600000
    }});
    if (!isValid) {
      throw new Error('Token has expired or is invalid!');
    }
    // check password and confirmPassword
    if (password !== confirmPassword) {
      throw new Error('Passwords don\'t match');
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save password to user
    const user = await ctx.db.mutation.updateUser({
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      },
      where: {
        email
      }
    });
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },

  async updatePermissions(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to update permissions');
    }
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    return ctx.db.mutation.updateUser({
      data: {
        permissions: {
          set: args.permissions
        }
      },
      where: {
        id: args.userId
      }
    });
  },

  async addToCart(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to update permissions');
    }
    const [ cartItem ] = await ctx.db.query.cartItems({
      where: {
        item: {
          id: args.id
        },
        user: {
          id: ctx.request.userId
        }
      }
    });
    if (cartItem) {
      return ctx.db.mutation.updateCartItem({
        where: {
          id: cartItem.id
        },
        data: {
          quantity: cartItem.quantity + 1
        }
      }, info);
    }
    return ctx.db.mutation.createCartItem({
      data: {
        user: {
          connect: {
            id: ctx.request.userId,
          }
        },
        item: {
          connect: {
            id: args.id
          }
        }
      }
    }, info);
  },

  async removeFromCart(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to update permissions');
    }
    const cartItem = await ctx.db.query.cartItem({
      where: {
        id: args.id
      }
    }, `{id user { id }}`);

    if (!cartItem) throw new Error('No CartItem Found!');

    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error('You cannot delete a cart Item that is not yours')
    }

    return ctx.db.mutation.deleteCartItem({
      where: {
        id: args.id
      }
    }, info);
  },

  async createOrder(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be logged in to update permissions');
    }
    const user = await ctx.db.query
    .user({ where: { id: userId}}, `{
      id
      email
      name
      cart {
        id
        quantity
        item {
          title
          price
          description
          largeImage
          image
          }
        }
      }`);
    const totalAmount = user.cart.reduce((tally, cartItem) =>
      tally + cartItem.quantity *  cartItem.item.price, 0
    );
    const charge = await stripe.charges.create({
      amount: totalAmount,
      source: args.token,
      description: 'Order for items',
      currency: 'USD'
    });

    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId }}
      }
      delete orderItem.id;
      return orderItem
    });

    const order = await ctx.db.mutation.createOrder({
      data: {
        user: { connect: { id: userId }},
        items: { create: orderItems },
        total: charge.amount,
        charge: charge.id
      }
    }, info);

    const cartIds = user.cart.map(cartItem => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: {id_in: cartIds}
    });
    return order
  }
};

module.exports = mutations;
