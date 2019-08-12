const knex = require('./index').knex;
const ModelUtility = require('./index').utilities;
const promise = require('promise')

const user_columns = [
	'id','name','created_at','updated_at'
]
const self = module.exports = {
    getUser : (name) =>{
        let query = knex.from('users').where('name', '=', name).select('*')
        return new promise((resolve,reject) =>{
            query.then((result) => {
                resolve(result[0]);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },

    getUserById : (id) =>{
        let query = knex.from('users').where('id', '=', id).select(user_columns)
        let user = null;
        return new promise((resolve,reject) =>{
            query.then((dbUser) => {
                user = dbUser[0];
                resolve(user);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },

    listUsers : () =>{
        let query = knex.from('users').select(user_columns)
        return new promise((resolve,reject) =>{
            query.then((users) => {
                resolve(users);
            }).catch((err) =>{
                reject(err);
            });
        }); 
    },

    createUser : (name,password) =>{
        let query = knex('users').insert({
            name : name,
            password : password,
            created_at : new Date(),
            updated_at : new Date()
        }).returning(user_columns);
        
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
    }
    
}
