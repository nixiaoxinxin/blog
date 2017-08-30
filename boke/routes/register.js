var express = require('express');
var router = express.Router();
var conn=require('../conn')
var insert=conn.insert;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
});
router.post('/',function (req,res,next) {
    insert('student',function (data) {
      res.send(data)
    },{'username':req.body.username,'password':req.body.password})
})

module.exports = router;
