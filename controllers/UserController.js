const {
    User
} = require('../models/index')
const bcrypt = require('bcryptjs')
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, 
//     auth: {
//         user: 'ivankajuniar@gmail.com',
//         pass: 'Vanka9874'
//     }
// });
class UserController {
    static async RegisterForm(req, res) {
        try {
            res.render('register-form')
        } catch (error) {
            res.send(error)
        }
    } 
    static async RegisterHandler(req, res) {
        try {
            const {
                email,
                password,
                role
            } = req.body
            await User.create({
                email,
                password,
                role
            })
            // await transporter.sendMail({
            //     from: 'ivankajuniar@gmail.com',
            //     to: email,
            //     subject: 'Registration Confirmation',
            //     text: 'Thank you for registering with our service.'
            // });
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }
    static async Login(req, res) {
        try {
            res.render('login-form',{error:req.query.error})
        } catch (error) {
            res.send(error)
        }
    }
    static async loginPost(req, res) {
        try {
            // console.log(req.body);
            const {email, password} = req.body

            // res.render('login-form')
            let user = await User.findOne({
                where: {
                    email: email
                }
            })
            // console.log(user);
            // res.send(user)
            if(user){
                const isValidPassword = bcrypt.compareSync(password,user.password)
                req.session.userId = user.id
                req.session.role = user.role
                if(isValidPassword){
                    res.redirect('/home')
                }else {
                    const error = "invalid username/password"
                    res.redirect(`/login?error=${error}`)
                }
            }else {
                const error = "invalid username/password"
                res.redirect(`/login?error=${error}`)
            }
        } catch (error) {
            // res.send(error)
            console.log(error);
        }
    }
    static Logout(req, res) {
        req.session.destroy((err) => {
            if(err){
                res.send(err)
            }else{
                res.redirect('/login')
            }
        })
    }
}
module.exports = UserController