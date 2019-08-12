const knex = require('./index').knex;
const ModelUtility = require('./index').utilities;
const promise = require('promise')

const columns = [
	'id','name','price','created_at','updated_at'
]
const self = module.exports = {
    create : (name,price) =>{
        let query = knex('t_product').insert({
            name : name,
            price: price,
            created_at : new Date(),
            updated_at : new Date()
        }).returning(columns);  
        return new promise((resolve,reject) =>{
            query.then((item) => {
                resolve(item);
            }).catch((err) =>{
                if(err.code == 23505){
                    reject('name '+name+' already exists');
                }
                reject(err);
            });
        }); 
    },
    update : () =>{
        let query = knex.from('t_product').select(columns)
        return new promise((resolve,reject) =>{
            query.then((item) => {
                resolve(item);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },
    list : (name) =>{
        let query = knex.from('t_product').select('*')
        return new promise((resolve,reject) =>{
            query.then((result) => {
                resolve(result);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },
    get : (id) =>{
        let query = knex.from('t_product').where('id', '=', id).select(columns)
        let item = null;
        return new promise((resolve,reject) =>{
            query.then((item) => {
                item = item[0];
                resolve(item);
            }).catch((err) =>{
                console.log(err);
                reject(err);
            });
        }); 
    },
    getShops : (id,lat,long,distance, time) =>{
        let query,condition = '',select = '';
        if((lat && long && distance) ){
            console.log('get lat long')
            select += ` , ts.*, round((point(${long}, ${lat}) <@> point(longitude, latitude)::point)::numeric,3) as miles `
            condition  += `and round((point(${long}, ${lat}) <@> point(longitude, latitude)::point)::numeric,3) < ${distance}`
        }
        if(time){
            condition  += `and starthour < ${time}   and   closehour > ${time}`
        }
        query  = knex.raw(`select tshop.* ${select} from t_product tp inner join t_stock ts  on tp.id = ts.product_id inner join t_shop tshop on tshop.id = ts.shop_id where  ts.product_id =`+id+ ` ${condition} ORDER BY miles`)
        console.log(query);
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
        let query = knex.from('t_product').where('id', '=', id).del();
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
