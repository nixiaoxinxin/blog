var express = require('express');
var router = express.Router();
var conn = require('../conn');
var search=conn.search;

/* GET home page. */

// var deal = {
//     funs: [{
//         name: 'find',
//         query: {},
//         limit: 5,
//         skip: 0
//     },{
//         name: 'count',
//         query: {}
//     }],
//     colName: 'article',
// }
//
// router.get('/', function(req, res, next) {
//     if(req.query.page){
//         deal.funs[0].skip = (req.query.page - 1) * 5;
//     }
//     conn(deal, function(data){
//         var len = Math.ceil((data.count - 0)/(data.find.length));
//         var pageArr = [];
//         for(var i = 0; i < len; i++){
//             pageArr.push(i + 1);
//         }
//         pageArr.splice(3, (len - 6))
//         pageArr.splice(3, 0, '···')
//
//         res.render('index', {list: data.find, pages: pageArr});
//     })
// });
        router.get('/',function (req,res,next) {
            search('article',function (datas,len) {
                var num=Math.ceil(len/5)
                var nums=[];
                for(var i=0;i<num;i++){
                    nums.push(i+1)
                }
                nums.splice(2,(num-4))
                nums.splice(2,0,'...')
                res.render('index',{list:datas,pages:nums})
            },(req.query.page-1)*5)
        })
module.exports = router;


