var express = require('express');
var router = express.Router();
var conn=require('../conn')
var find=conn.findart;

/* GET users listing. */
// router.get('/', function(req, res, next) {
// 	var title = JSON.parse(req.query.title);
// 	console.log(title)
//     res.render('article', { title: 'Express' });
// });
	router.get('/',function (res,req,next) {
		var val=req.query.title.toString();
		find('article',function (datas) {
			res.render('article',{'list':datas[0]})
			console.log(datas)
        },val)
    })
module.exports = router;
