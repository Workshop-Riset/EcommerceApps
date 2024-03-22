const formatRp = require('../helper/formattingRp');
const {Product,Category} = require('../models/index');
class ProductController{
    static async getProduct(req,res){
        try {
            let product = await Product.findAll({include:Category})
            // res.send(data)
            let userId = req.session.userId
            res.render('getProduct',{product, message : req.query.message, formatRp, userId})
        } catch (error) {
            res.send(error)
        }
    }
    static async renderAddProduct(req,res){
        try {
            let categories = await Category.findAll()
            let userId = req.session.userId

            res.render('addProduct',{categories, role:req.session.role, errorMessages:req.query.errorMessages, userId})
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerAddProduct(req,res){
        try {
            // {
            //     productName: 'asdwaa',
            //     productDescription: 'asdwasdwa',
            //     productPrice: '11',
            //     productStock: '11',
            //     productCategory: '1'
            //   }
            const {productName, productDescription, productPrice, productStock, productCategory, imgSrc} = req.body
            await Product.create({
                name : productName,
                description : productDescription,
                price : productPrice,
                stock : productStock,
                CategoryId : productCategory,
                imgSrc
            })
            res.redirect('/product')
            console.log(req.body);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                // Extract error messages from the error object
                const errorMessages = error.errors.map(err => err.message);
                // Redirect to addProduct page with error messages
                res.redirect(`/product/add?errorMessages=${encodeURIComponent(JSON.stringify(errorMessages))}`);
            } else {
                // Redirect to error page for other types of errors
                res.send(error);
            }
        }
    }
    static async addFormStock(req,res){
        try {

            let data = await Product.findByPk(req.params.productId)
            let userId = req.session.userId

            res.render('addStock',{data, errorMessages:req.query.errorMessages, userId})                           
        } catch (error) {
            res.send(error)
        }
    }
    static async addStock(req,res){
        try {
            console.log(req.body);
            const {productStock} = req.body
            await Product.increment('stock', { by: +productStock, where: { id: req.params.productId } });
            res.redirect('/product')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                // Extract error messages from the error object
                const errorMessages = error.errors.map(err => err.message);
                // Redirect to addProduct page with error messages
                res.redirect(`/product/addStock?errorMessages=${encodeURIComponent(JSON.stringify(errorMessages))}`);
            } else {
                // Redirect to error page for other types of errors
                res.send(error);
            }
        }
    }
    static async delete(req,res){
        try {
            let data = await Product.findByPk(req.params.productId,{include : Category})
            await Product.destroy({where : {id : req.params.productId}})
            const message = `Product ${data.name} dengan category ${data.Category.name} berhasil di hapus`
            res.redirect('/product?message='+message)
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = ProductController