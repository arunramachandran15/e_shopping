const UserController = require('../controllers').users;
const ShopController = require('../controllers').shops;
const ProductController = require('../controllers').products;
const StockController = require('../controllers').stocks;
const OrderController = require('../controllers').orders;
const Validator = require('../middlewares/validator');
const AuthMiddlewares = require('../middlewares/auth');

module.exports = (app) => {

  app.post('/api/login',Validator.loginRequest ,UserController.login);
  app.post('/api/signup',UserController.signup);

  app.get('/api/users/',AuthMiddlewares.isLoggedIn,UserController.listUsers);
  app.get('/api/users/:user_id',UserController.getUserById);

  app.post('/api/shops',ShopController.post);
  app.get('/api/shops',ShopController.list);
  app.get('/api/shops/:shop_id',ShopController.get);
  app.delete('/api/shops/:shop_id',ShopController.delete);

  app.post('/api/products',ProductController.post);
  app.get('/api/products',ProductController.list);
  app.get('/api/products/:id',ProductController.get);
  app.delete('/api/products/:id',ProductController.delete);

  // app.post('/api/stocks',Validator.friendList,StockController.addFriends);
  // app.get('/api/stocks',StockController.checkConnection);
  // app.put('/api/stocks/:id',StockController.listUserFriendsTable);
  // app.delete('/api/stocks/:id',StockController.deleteUserFriendsTable);

  app.post('/api/orders',OrderController.post);
  app.get('/api/orders',OrderController.list);
  app.get('/api/orders/:id',OrderController.get);
  app.put('/api/orders/:id',OrderController.put);
  app.delete('/api/orders/:id',OrderController.delete);

  app.get('/api',  (req, res) => res.status(200).send({
    message: 'Welcome to network!',
  }));

};
