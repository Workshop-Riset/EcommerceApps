const {
    User,
    Product,
    Category,
    Order,
    OrderDetail
} = require('../models/index')
const easyinvoice = require('easyinvoice');
class ShopController {
    static async getProduct(req, res) {
        try {
            let role = req.session.role
            let userId = req.session.userId
            let products = await Product.findAll({
                include: Category
            })
            res.render('product-shop', {
                products,
                userId,
                role
            })
            // res.send(data)
        } catch (error) {
            res.send(error)
        }
    }
    static async addToCart(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId);
            const userId = req.session.userId;

            const order = await Order.create({
                orderDate: new Date(),
                totalAmount: product.price,
                UserId: userId
            });

            await OrderDetail.create({
                OrderId: order.id,
                ProductId: productId,
                quantity: 1,
                unitPrice: product.price
            });

            product.stock--;
            await product.save();

            res.redirect('/shop');
        } catch (error) {
            res.send(error);
        }
    }
    static async viewCart(req, res) {
        try {
            const userId = req.session.userId;
            const userOrders = await Order.findAll({
                where: { UserId: userId },
                include: [{ model: OrderDetail, include: [{ model: Product }] }]
            });
    
            const invoiceData = {
                documentTitle: 'Invoice',
                marginTop: 25,
                marginRight: 25,
                marginLeft: 25,
                marginBottom: 25,
                products: [], // Menambahkan array untuk produk
                bottomNotice: 'Thank you for your purchase.'
            };
    
            userOrders.forEach(order => {
                order.OrderDetails.forEach(orderDetail => {
                    const product = orderDetail.Product;
                    const productData = {
                        quantity: orderDetail.quantity,
                        description: product.name, // Menambahkan nama produk
                        tax: 6,
                        price: orderDetail.unitPrice
                    };
                    invoiceData.products.push(productData); // Menambahkan data produk ke dalam array
                });
            });
    
            easyinvoice.createInvoice(invoiceData, function(result) {
                res.contentType('application/pdf');
                res.send(result.pdf);
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
}
module.exports = ShopController