var express = require('express');
var router = express.Router();

// var User = require('../models/user');
const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users');
});

// router.post('/new', user_controller.new);

router.post('/new', user_controller.new);

// router.post('/new', function(req, res, next) {
//   // res.render('index', { title: 'new' });
//   // return res.json({hi: 'hi'});
//
//     let form = req.body;
//     const user = new User({
//       email: form.email,
//       password: form.password,
//       joined: new Date(),
//       admin: false
//     }).save(err => {
//       if (err) return next(err)
//
//
//     })
//     // res.render('index', { title: 'new issue added!' });
//     // return res.json{message:'success'}
//
// });

module.exports = router;
