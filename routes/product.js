const routes = require("express").Router();
const ProductController = require("../controllers/ProductController");
const {isLogin, isAdmin} = require('../middlewares/auth')
routes.use(isAdmin)
routes.get('/',ProductController.getProduct)
routes.get('/add',ProductController.renderAddProduct)
routes.post('/add',ProductController.handlerAddProduct)
routes.get('/addStock/:productId', ProductController.addFormStock)
routes.post('/addStock/:productId', ProductController.addStock)
routes.get('/delete/:productId', ProductController.delete)
module.exports = routes