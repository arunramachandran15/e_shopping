
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('users', function(table) {
	        table.increments('id').unsigned().primary();
	        table.string('name').notNull();
	        table.string('password').notNull();
	        table.dateTime('created_at').notNull();
	        table.dateTime('updated_at').nullable();
	        table.unique(['name']);
		})
	])
}

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users')
	])
}

