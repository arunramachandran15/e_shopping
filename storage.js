var pgtools = require('pgtools');
pgtools.createdb({
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  ssl: true,
  host: '^&&%&*.^**((&^&*)).us-east-1.rds.amazonaws.com'
}, 'test-db', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});

  