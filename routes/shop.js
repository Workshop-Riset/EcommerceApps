const ShopController = require("../controllers/ShopController");
const routes = require("express").Router();

routes.get('/', ShopController.getProduct)
routes.post('/addToCart/:id', ShopController.addToCart)
routes.get('/cart/:id', ShopController.viewCart)
module.exports = routes