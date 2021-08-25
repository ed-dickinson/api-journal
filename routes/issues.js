var express = require('express');
var router = express.Router();

const issue_controller = require('../controllers/issueController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'not ex' });
});

router.get('/posts', function(req, res, next) {
  res.send('index', { title: 'Summin' });
});

router.get('/new', issue_controller.new);

router.get('/:issue_no', issue_controller.get_issue);


module.exports = router;
