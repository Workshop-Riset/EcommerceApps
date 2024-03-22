const routes = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const {isLogin, isAdmin} = require('../middlewares/auth')
routes.use(isAdmin)
routes.get('/',CategoryController.getCategory)
module.exports = routes