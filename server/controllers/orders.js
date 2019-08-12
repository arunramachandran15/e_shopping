const Order = require('../models/order');

const self = module.exports = {
    post: async (req, res) => {
        let request = req.body;
        try {
            let user = await Order.create(request)
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
    put: async (req, res) => { // validate update data in validator
        let request = req.body;
        let name = request.name;
        try {
            let user = await Order.update(name)
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
        Order.list().then((orders) => {
            if (!orders)
                res.json({ 'status': 401, 'error': "Orders not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'orders': orders
                });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ 'status': 405, 'error': err });
        });
    },
    get: async (req, res) => {
        try {
            let dborder = await Order.get(req.params.id)
            if (!dborder)
                res.json({ 'status': 401, 'error': "Order not found" });
            else {
                let order = dborder;

                console.log('get shops lat long')
                if (req.query.lat && req.query.distance) {
                    let shops = await Order.getShops(order.id, req.query.lat, req.query.long, req.query.distance, req.query.time);
                    order.shops = shops;
                }
                console.log(order);
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'order': order
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
            let order = await Order.delete(req.params.order_id)
            if (!order)
                res.json({ 'status': 401, 'error': "order  not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'order': 'deleted'
                });
            }
        }
        catch (err) {
            res.json({ 'status': 405, 'error': err });
        }
    },
};