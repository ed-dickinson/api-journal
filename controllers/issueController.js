var Issue = require('../models/issue');

exports.new = (req, res, next) => {
  const issue = new Issue({
    no: 0,
    title: 'test title',
    emoji: '🥸',
    // date: new Date(),
    content: 'test content',
    published: false
  }).save(err => {
    if (err) return next(err)
                // res.redirect('user/' + req.body.username);

  })
  res.redirect('index', { title: 'new issue added!' });
};

exports.get_issue = (req,res,next) => {
  Issue.findOne({'no':req.params.issue_no})
      // .populate('friends')
      .exec(function(err, issue) {
        if (err) {return next(err);}
        if (issue==null) {
          var err = new Error('Issue not found!');
          err.status = 404;
          return next(err);
        }
        return res.json(issue);
      })
};
