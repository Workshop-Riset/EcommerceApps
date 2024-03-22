const routes = require("express").Router();
const MainController = require("../controllers/MainController");
const UserController = require("../controllers/UserController");
// const ProfileController = require("../controllers/ProfileController");
const routeProduct = require('./product')
const routeCategory = require('./category')
const routeProfile = require('./profile')
const routeShop = require('./shop')
const {isLogin, isAdmin} = require('../middlewares/auth');
// home

//get register
routes.get('/register', UserController.RegisterForm)
//post register
routes.post('/register', UserController.RegisterHandler)
//get login

routes.get('/login', UserController.Login)
//post login
routes.post('/login', UserController.loginPost)
// routes.use((req, res, next) => {
//     if(req.session.userId){
//         const error = 'Please login first!'
//         res.redirect(`/login?error=${error}`)
//     }else{
//         next()
//     }
// })
routes.use(isLogin)
routes.get('/logout', UserController.Logout)
routes.use('/home', MainController.Home)
// routes.use((req, res, next) => {
//     if(req.session.userId && req.session.role !== 'Admin'){
//         const error = 'You have no access this page'
//         res.redirect(`/login?error=${error}`)
//     }else{
//         next()
//     }
// })
routes.use('/profile', routeProfile)
routes.use('/product', routeProduct)
routes.use('/category', routeCategory)
routes.use('/shop', routeShop)
// routes.post('/register', UserController.RegisterHandler)
module.exports = routes