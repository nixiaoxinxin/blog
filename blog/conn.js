var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var conf = {
    adr: '127.0.0.1',
    port: '27017',
    auto: {auto_reconnect: true},
    db: 'test'
};
var server = new Server(conf.adr, conf.port, conf.auto);
var db = new Db(conf.db ,server);

function find(colName, fun, query){

    db.open(function(err){
        if(!err){
            db.collection(colName, function(err, col){
                if(!err){

                    col.find(query).toArray(function(err, data){
                        if(!err){
                            if(data.length > 0){
                                fun('ok');
                            } else {
                                fun('err');
                            }

                        } else {
                            fun('err');
                        }
                        db.close();
                    })
                }

            })
        }
    })
}
function insert(colName, fun, query){
    db.open(function(err){
        if(!err){
            db.collection(colName, function(err, col){
                if(!err){
                    col.insert(query,(function(err, data){
                            if(!err){
                                fun('ok')
                                // if(data.length > 0){
                                //     fun('err');
                                // } else {
                                //     fun('ok');
                                // }

                            } else {
                                fun('err');
                            }
                            db.close();
                        })
                    )}
            })
        }
    })
}

function search(colname,fun,page){
    var len;
    var datas;
    var step=0;
    db.open(function(err){
        if(!err){
            db.collection(colname,function (err,col) {
                if(!err){
                    col.find().toArray(function(err,data){
                        if(!err){
                            len=data.length;
                            step++;
                            if(step ==2){
                                fun(datas,len)
                            }
                        }
                    })
                    col.find().skip(page).limit(5).toArray(function (err,data) {
                        if(!err){
                            datas=data;
                            if(data.length>0){
                                step++;
                                if(step ==2){
                                    fun(datas,len)
                                }
                            }else {
                                fun(err)
                            }
                        }else {
                            fun(err)
                        }
                        db.close();
                    })
                }
            })
        }
    })
}
function deleteOne(colName, fun, query){
    db.open(function(err){
        if(!err){
            db.collection(colName, function(err, col){
                if(!err){
                    col.deleteOne(query,(function(err, data){
                            if(!err){
                                if(data.length > 0){
                                    fun('err');
                                } else {
                                    fun('ok');
                                }

                            } else {
                                fun('ok');
                            }
                            db.close();
                        })
                    )}
            })
        }
    })
}
function findart(colName, fun, query){
    var datas;
    db.open(function(err){
        if(!err){
            db.collection(colName, function(err, col){
                if(!err){

                    col.find({'artTit':query}).toArray(function(err, data){
                        if(!err){
                            datas=data;
                            if(data.length > 0){
                                fun(datas);
                            } else {
                                fun('err');
                            }

                        } else {
                            fun('err');
                        }
                        db.close();
                    })
                }

            })
        }
    })
}
exports.find = find;
exports.insert=insert;
exports.search=search;
exports.deleteOne=deleteOne;
exports.findart=findart;