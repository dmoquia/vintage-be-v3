"use strict";
const stripe = require("stripe")(process.env.STRIPE_KEY);

/**
 * order controller
 */

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::order.order", ({ strapi }) => ({
//   create: async (ctx) => {
//     console.log(ctx);
//     const { name, total, items, stripeTokenId } = ctx.request.body;
//     const { id } = ctx.state.user;
//     console.log(ctx.request.body);
//     const charge = await stripe.charges.create({
//       amount: Math.round(total * 100),
//       currency: "usd",
//       source: stripeTokenId,
//       description: `Order ${new Date()} by ${ctx.state.user.username}`,
//     });
//     const order = await strapi.services.order.create({
//       name,
//       total,
//       items,
//       user: id,
//     });
//     return order;
//   },
// }));
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  create: async (ctx) => {
    const {
      data: { name, total, items, stripeTokenId },
    } = ctx.request.body;

    if (!stripeTokenId) {
      console.log("stripeTokenId is missing or invalid");
      return ctx.throw(400, "stripeTokenId is missing or invalid");
    }

    const { id } = ctx.state.user;
    console.log(id);
    const charge = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: "usd",
      source: stripeTokenId,
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
    });
    // const order = await strapi.services.order.create({
    //   name,
    //   total,
    //   items,
    //   user: id,
    // });
    const order = await strapi.entityService.create("api::order.order", {
      data: {
        name,
        total,
        items,
        user: id,
      },
    });
    return order;
  },
}));
