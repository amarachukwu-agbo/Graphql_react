import { forwardTo } from 'prisma-binding';
import hasPermission from '../utils'

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    if(!ctx.request.userId) {
        return null;
    }
    return ctx.db.query.user({
      where: {
        id: ctx.request.userId,
      }
    }, info);
  },
  users(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to perform this action');
    }

    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to perform this action');
    }
    const order = await ctx.db.query.order({
      where: { id: args.id }
    }, `{id total charge user { id } items { id quantity description title price image}}`);

    const hasOrder = ctx.request.user.id === order.user.id;

    const hasPermission = ctx.request.user.permissions.includes('ADMIN');

    if (!hasOrder || !hasPermission) {
      throw new Error('You don\'t have permissions to view this order');
    }

    return order;
  },

  orders(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to perform this action');
    }
    return ctx.db.query.orders({
      where: { user: { id: ctx.request.userId } },
      orderBy: args.orderBy
    }, info);
  }
};

module.exports = Query;
