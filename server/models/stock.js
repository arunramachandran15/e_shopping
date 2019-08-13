const knex = require('./index').knex;
const ModelUtility = require('./index').utilities;
const promise = require('promise')

const columns = [
	'id','name','latitude','longitude','created_at','updated_at'
]
const self = module.exports = {
    create : (name) =>{
        let query = knex('t_product').insert({
            shop_id : stock.shop_id,
            product_id: stock.product_id,
            availability : stock.availability,
            updated_at : new Date()
        }).returning(columns);  
        return new promise((resolve,reject) =>{
            query.then((user) => {
                resolve(user);
            }).catch((err) =>{
                if(err.code == 23505){
                    reject('name '+name+' already exists');
                }
                reject(err);
            });
        }); 
    },
    update : () =>{
        let query = knex.from('t_stock').select(columns)
        return new promise((resolve,reject) =>{
            query.then((t_stock) => {
                resolve(t_stock);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },
    list : (name) =>{
        let query = knex.from('t_stock').select('*')
        return new promise((resolve,reject) =>{
            query.then((result) => {
                resolve(result);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },
    get : (id) =>{
        let query = knex.from('t_stock').where('id', '=', id).select(columns)
        let user = null;
        return new promise((resolve,reject) =>{
            query.then((dbUser) => {
                user = dbUser[0];
                resolve(user);
            }).catch((err) =>{
                console.log(err);
                reject(err);
            });
        }); 
    },
    getStocks : (stock_id) =>{
        let query  = knex.raw('select * from t_stock ts inner join t_product tp on tp.id = ts.product_id where ts.stock_id ='+stock_id)
        let stocks = null;
        return new promise((resolve,reject) =>{
            query.then((stocks) => {
                resolve(stocks.rows);
            }).catch((err) =>{
                console.log(err)

                reject(err);
            });
        }); 
    },
    delete : (id) =>{
        let query = knex.from('t_stock').where('id', '=', id).del();
        return new promise((resolve,reject) =>{
            query.then((item) => {
                console.log(item)
                resolve(item);
            }).catch((err) =>{
                console.log(err)
                reject(err);
            });
        }); 
    },
}
