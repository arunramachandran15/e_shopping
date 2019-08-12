const Product = require('../models/product');

const self = module.exports = {
    post: async (req, res) => {
        let request = req.body;
        let name = request.name;
        try {
            let user = await Product.create(name)
            if (user) {
                res.json({ 'status': 200, 'message': 'ok', 'data': user });
            } else {
                res.json({ 'status': 401, 'error': 'User not saved' });
            }
        }
        catch (err) {
            res.json({ "status": 405, "error": err });
        }
    },
    list: (req, res) => {
        Product.list().then((products) => {
            if (!products)
                res.json({ 'status': 401, 'error': "Products not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'products': products
                });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ 'status': 405, 'error': err });
        });
    },
    get: async (req, res) => {
        try {
            let dbproduct = await Product.get(req.params.id)
            if (!dbproduct)
                res.json({ 'status': 401, 'error': "Product not found" });
            else {
                let product = dbproduct;

                console.log('get shops lat long')
                if (req.query.lat && req.query.distance) {
                    let shops = await Product.getShops(product.id, req.query.lat, req.query.long, req.query.distance, req.query.time);
                    product.shops = shops;
                }
                console.log(product);
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'product': product
                });
            }
        }
        catch (err) {
            console.log(err)
            res.json({ 'status': 405, 'error': err });
        }
    },
    delete: async (req, res) => {
        try {
            let product = await Product.delete(req.params.product_id)
            if (!product)
                res.json({ 'status': 401, 'error': "product  not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'product': 'deleted'
                });
            }
        }
        catch (err) {
            res.json({ 'status': 405, 'error': err });
        }
    },
};