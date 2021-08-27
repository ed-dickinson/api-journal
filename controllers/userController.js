var User = require('../models/user');



exports.new = (req, res, next) => {
  // const issue = new Issue({
  //   no: 0,
  //   title: 'test title',
  //   emoji: '🥸',
  //   date: new Date(),
  //   content: 'test content',
  //   published: false
  // let importedIssue = issuesImp[4];
  let form = req.body;
  const user = new User({
    email: form.email,
    password: form.password,
    joined: new Date(),
    admin: false
  }).save(err => {
    if (err) return next(err)


  })
  // res.render('index', { title: 'new issue added!' });
  return res.json({message:'success'})
};

// exports.get_issue = (req,res,next) => {
//   Issue.findOne({'no':req.params.issue_no})
//       // .populate('friends')
//       .exec(function(err, issue) {
//         if (err) {return next(err);}
//         if (issue==null) {
//           var err = new Error('Issue not found!');
//           err.status = 404;
//           return next(err);
//         }
//         return res.json(issue);
//       })
// };
