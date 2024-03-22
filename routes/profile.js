const ProfileController = require("../controllers/ProfileController");

const routes = require("express").Router();

routes.post('/editProfile/:idProfile', ProfileController.handlerEditProfile)
routes.get('/editProfile/:idProfile', ProfileController.renderEditProfile)
routes.get('/editUser/:idProfile', ProfileController.renderEditUser)
routes.post('/editUser/:idProfile', ProfileController.handlerEditUser)
routes.get('/:idProfile', ProfileController.getProfile)
module.exports = routes