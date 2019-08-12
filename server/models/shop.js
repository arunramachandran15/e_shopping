const knex = require('./index').knex;
const ModelUtility = require('./index').utilities;
const promise = require('promise')

const columns = [
	'id','name','latitude','longitude','created_at','updated_at'
]
const self = module.exports = {
    create : (name) =>{
        let query = knex('t_shop').insert({
            name : name,
            created_at : new Date(),
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
        let query = knex.from('t_shop').select(columns)
        return new promise((resolve,reject) =>{
            query.then((t_shop) => {
                resolve(t_shop);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },
    list : (name) =>{
        let query = knex.from('t_shop').select('*')
        return new promise((resolve,reject) =>{
            query.then((result) => {
                resolve(result);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },
    get : (id) =>{
        let query = knex.from('t_shop').where('id', '=', id).select(columns)
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
    getStocks : (shop_id) =>{
        let query  = knex.raw('select * from t_stock ts inner join t_product tp on tp.id = ts.product_id where ts.shop_id ='+shop_id)
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
        let query = knex.from('t_shop').where('id', '=', id).del();
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
