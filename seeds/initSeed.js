

var shop = [
    {
        name: 'Boba shop 1',
        city: "chennai",
        starthour: 6,
        closehour: 20,
        latitude: 115.0472780,
        longitude: -85.3071590
    },
    {
        name: 'Boba shop 2',
        city: "california",
        starthour: 0,
        closehour: 24,
        latitude: 106.7783,
        longitude: -119.4179
    },
    {
        name: 'Boba shop 3',
        city: "chicago",
        starthour: 0,
        closehour: 24,
        latitude: 76.7783,
        longitude: -119.4179
    }
]


var product = [
    {
        name: 'Mediumtea',
        price: 10
    },
    {
        name: 'Hightea',
        price: 20
    },
    {
        name: 'Cadbury',
        price: 5
    },
    {
        name: 'hershey',
        price: 6
    }
]

var stock = [
    {
        shop_id: 1,
        product_id: 1,
        availability: 10
    },
    {
        shop_id: 1,
        product_id: 2,
        availability: 10
    },
    {
        shop_id: 1,
        product_id: 3,
        availability: 10
    },
    {
        shop_id: 2,
        product_id: 2,
        availability: 10
    },
    {
        shop_id: 4,
        product_id: 1,
        availability: 10
    },
    {
        shop_id: 4,
        product_id: 2,
        availability: 3
    }
]



exports.seed = function (knex, Promise) {
    return new Promise(async (resolve, reject) => {
        try {


            await knex('t_stock').del();

            // await knex('t_product').del(),
            // await knex('t_shop').del(),
            //  await knex.batchInsert('t_product',product)
            //  await knex.batchInsert('t_shop',shop)


            



            await knex('t_stock').insert(stock);

            resolve()
        }
        catch (err) {
            reject(err);
        }

    })
};