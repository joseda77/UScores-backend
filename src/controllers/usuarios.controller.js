const usuariosModel = require('../models/usuarioModels');

var getListUsuarios = function(req, res , next){
    usuariosModel.find({},function(err, usuariosModel){
        if(err){
            return next(err);
        }else{
            res.json(usuariosModel);
        }
    });
};


module.exports = {
    getListUsuarios
}