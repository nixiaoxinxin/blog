var express = require('express');
var router = express.Router();
var conn=require('../conn')
var find=conn.find;
/* GET users listing. */
router.get('/', function(req, res, next) {

    res.render('login', { title: 'Express' });
});
router.post('/', function(req, res, next) {
    find('student',function (data) {
        res.send(data)
    },{'username':req.body.username,'password':req.body.password})
});

module.exports = router;
