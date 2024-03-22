
class MainController {
    static async Home(req,res){
        try {
            let role = req.session.role
            let userId = req.session.userId;
            res.render('home', {role,userId})
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = MainController