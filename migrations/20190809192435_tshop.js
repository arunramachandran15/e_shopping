
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('t_shop', function(table){
			table.increments('id').unsigned().primary()
			table.string('name')
			table.string('city')
			table.integer('starthour').unsigned()
			table.integer('closehour').unsigned()
			table.float('latitude', 14, 10).notNull()
			table.float('longitude', 14, 10).notNull()
			table.unique(['name']);
			table.timestamps()
		}),
		knex.schema.createTable('t_product', function(table)	{
			table.increments('id').unsigned().primary()
			table.string('name')
			table.integer('price')
			table.timestamps()
		}),
		knex.schema.createTable('t_stock', function(table)	{
			table.increments('id').unsigned().primary()
			table.integer('product_id').unsigned().references('id').inTable('t_product')
			table.integer('shop_id').unsigned().references('id').inTable('t_shop')
			table.integer('availability')
			table.timestamps()
		}),
		knex.schema.createTable('t_order', function(table) {
			table.increments('id').unsigned().primary()
			table.integer('product_id').unsigned().references('id').inTable('t_product')
			table.integer('user_id').unsigned().references('id').inTable('users')
			table.integer('shop_id').unsigned().references('id').inTable('t_shop')
			table.float('latitude', 14, 10).notNull()
			table.float('longitude', 14, 10).notNull()
			table.string('status')
			table.string('count')
			table.timestamps()
		})
	])
}

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('t_stock'),
		knex.schema.dropTable('t_order'),
		knex.schema.dropTable('t_shop'),
		knex.schema.dropTable('t_product')
	])
}