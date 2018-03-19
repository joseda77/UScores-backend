const torneosModel = require('../models/torneoModels');

var getListTorneos = function(req, res, next){
    torneosModel.find({},function(err,torneosModel){
        if (err){
            return next(err);
        }else{
            res.json(torneosModel);
        }
    });
};

module.exports = {
    getListTorneos
};