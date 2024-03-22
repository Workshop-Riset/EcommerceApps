const { Category } = require('../models/index');

class CategoryController {
    static async getCategory(req, res) {
        try {
            const {search} = req.query
            let userId = req.session.userId
            let categories = await Category.searchByName(search)
            // const categories = await Category.findAll();

            res.render('categoryList', { categories, role:req.session.role, userId });
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = CategoryController;
