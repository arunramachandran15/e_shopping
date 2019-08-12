const Shop = require('../models/shop');

const self = module.exports = {
    post: async (req, res) => {
        let request = req.body;
        let name = request.name;
        try{
        let user = await Shop.create(name)
          if(user){
            res.json({'status':200, 'message':'ok','data':user});
          }else{
            res.json({'status':401,'error':'User not saved'});
          }
        }
        catch(err){
          res.json({"status":405, "error" : err});
        }
    },
    list: (req, res) => {
        Shop.list().then((shops) => {
            if (!shops)
                res.json({ 'status': 401, 'error': "Shops not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'shops': shops
                });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ 'status': 405, 'error': err });
        });
    },
    get: async (req, res) => {
        let shop = null;
        try {
            let dbshop = await Shop.get(req.params.shop_id)
            if (!dbshop)
                res.json({ 'status': 401, 'error': "Shop not found" });
            else {
                let shop = dbshop;
                let stocks = await Shop.getStocks(shop.id);
                shop.stocks = stocks;
                console.log(shop);
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'shop': shop
                });
            }
        }
        catch (err) {
            console.log(err)
            res.json({ 'status': 405, 'error': err });
        }
    },
    delete: async (req, res) => {
        try{
            let shop = await Shop.delete(req.params.shop_id)
            if (!shop)
                res.json({ 'status': 401, 'error': "shop  not found" });
            else {
                res.json({
                    'status': 200,
                    'message': 'ok',
                    'shop': 'deleted'
                });
            }
        }
        catch(err){
            res.json({ 'status': 405, 'error': err });
        }
    },
};


