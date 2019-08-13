const Stock = require('../models/stock');

const self = module.exports = {
    post: async (req, res) => {
        let request = req.body;
        let name = request.name;
        try {
            let user = await Stock.create(name)
            if (user) {
                res.json({ 'status': 200, 'message': 'ok', 'data': user });
            } else {
                res.json({ 'status': 401, 'error': 'Stock not saved' });
            }
        }
        catch (err) {
            res.json({ "status": 405, "error": err });
        }
    },
    list: (req, res) => {
        Stock.list().then((stocks) => {
            if (!stocks)
                res.json({ 'status': 401, 'error': "Stocks not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'stocks': stocks
                });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ 'status': 405, 'error': err });
        });
    },
    get: async (req, res) => {
        try {
            let dbstock = await Stock.get(req.params.id)
            if (!dbstock)
                res.json({ 'status': 401, 'error': "Stock not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'stock': dbstock
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
            let stock = await Stock.delete(req.params.stock_id)
            if (!stock)
                res.json({ 'status': 401, 'error': "stock  not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'stock': 'deleted'
                });
            }
        }
        catch (err) {
            res.json({ 'status': 405, 'error': err });
        }
    },
};