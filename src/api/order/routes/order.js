"use strict";

/**
 * order router
 */

// const { createCoreRouter } = require("@strapi/strapi").factories;

// // module.exports = createCoreRouter("api::order.order");
// module.exports = createCoreRouter("api::order.order", ({ router }) => {
//   const orderController = require("../controllers/order");

//   router.post("/create", orderController.create);
// });
const { createCoreRouter } = require("@strapi/strapi").factories;
module.exports = createCoreRouter("api::order.order"); // core route already created
