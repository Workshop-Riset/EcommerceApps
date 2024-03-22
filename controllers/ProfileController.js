const {Profile, User} = require('../models/index')

// ProfileController.js
class ProfileController {
    static async getProfile(req,res){
        try {
            let user = await User.findByPk(req.params.idProfile, {include : Profile})
            let role = req.session.role
            let userId = req.session.userId
            res.render('profile', {user, role, userId})
        } catch (error) {
            res.send(error)
        }
    }
    static async renderEditProfile(req,res){
        try {
            let user = await User.findByPk(req.params.idProfile, {include : Profile})
            let role = req.session.role
            let userId = req.session.userId
            res.render('editProfile', {user, role, userId})
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerEditProfile(req,res){
        try {
            const {fullName, address, phoneNumber} = req.body
            const userId = req.session.userId;
            const user = await User.findByPk(userId, { include: Profile });
            console.log(user);
            let userProfile = user.Profile;
            if (!userProfile) {
                userProfile = await Profile.create({
                    fullName: fullName,
                    address: address,
                    phoneNumber: phoneNumber,
                    UserId: userId
                });
            } else {
                await userProfile.update({
                    fullName: fullName,
                    address: address,
                    phoneNumber: phoneNumber
                });
            }
            res.redirect(`/profile/${userId}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async renderEditUser(req,res){
        try {
            try {
                let user = await User.findByPk(req.params.idProfile, {include : Profile})
                let role = req.session.role
                let userId = req.session.userId
                res.render('editUser', {user, role, userId})
            } catch (error) {
                res.send(error)
            }
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerEditUser(req,res){
        try {
            const { email, role } = req.body;
            const userId = req.session.userId;
            const user = await User.findByPk(userId);
            await user.update({
                email: email,
                role: role
            });
            res.redirect(`/profile/${userId}`);
        } catch (error) {
            res.send(error)
        }
    }
}


module.exports = ProfileController