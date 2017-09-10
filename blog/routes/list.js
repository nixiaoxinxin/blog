var express = require('express');
var router = express.Router();
var conn=require('../conn')
var find=conn.findart;
/* GET users listing. */
router.get('/', function(req, res, next) {
    var val=req.query.title.toString();
    find('article',function (datas) {
        res.render('list',{'list':datas[0]})
        console.log(datas)
    },val)

});

module.exports = router;
