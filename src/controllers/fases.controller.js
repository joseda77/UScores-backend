const faseModel = require('../models/fasesModels');
const encuentros1Controller = require('./encuentrosTipo1.controller');

var getFases = function (req, res) {
    faseModel.find(function (err, faseMod) {
        if (err) {
            return res.status(500).json({ errMsg: err });
        } else {
            return res.status(201).json(faseMod);
        }
    });
}

var getFase = function (req, res) {
    faseModel.findById(req.params.id,function (err, faseMod) {
        if (err) {
            return res.status(500).json({ errMsg: err });
        } else {
            return res.status(201).json(faseMod);
        }
    });
}


/**va en crear fase, recordar colocar este metodo asincrono,ademas de arreglar el error del schema de fase*/
var createFase = async function (encuentros, numEquipos, clasificados, fase, listaParti) {
    faseMod = new faseModel({
        numeroEncuentros: encuentros,
        numeroEquipos: numEquipos,
        numeroDeClasificados: clasificados, /**Numero de clasificados por fase */
        numeroFase: fase,
        listaPartidos: listaParti
    });

    try {
        let guarda = await faseMod.save();
        return guarda._id;

    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return err;
        }
        return err;
    }
}



var updateFaseExtern = function (req, res) {
    faseModel.findById(req.params.id, function (err, faseMod) {
        faseMod.numeroEncuentros=  req.body.numeroDeEncuentros;
        faseMod.numeroEquipos = req.body.numeroEquipos;
        faseMod.numeroDeClasificados = req.body.numeroDeClasificados;
        faseMod.numeroFase = req.body.numeroFase;
        faseMod.estado = req.body.estado;
        faseMod.listaPartidos = req.body.listaPartidos;
        faseMod.save(function (err){
            if(err){
                return res.status(500).json({ errMsg: err});
            }else {
                return res.status(201).json(faseMod);
            }
        });
    });
}

var deleteFase = function (req, res) {
    faseModel.findById(req.body.id, function (err, faseMod) {
        if(err){
            return res.status(500).json({ errMsg: err});            
        }else {
            return res.status(500).json(faseMod);            
        }     
    });
 }

// var updateEquiposFase = function(fase,listaEquipos){
//     let tamaño =(listaEquipos.length)/2;
//     faseModel.findById(fase, function (err, faseMod) {
//         let lista = [];
//         for (let i = 0; i < tamaño; i++) {
//             let random = Math.floor(Math.random() * (listaEquipos.length-2));
//             let random2 = Math.floor(Math.random() * (listaEquipos.length-2));
//             let equipo1 = listaEquipos[random];
//             let equipo2 = listaEquipos[random2];
//             if (random!= random2) {                
//                 let partido = encuentros1Controller.createEncuentro(equipo1, equipo2, fase, 1);
//                 listaEquipos.splice(random, 1);
//                 listaEquipos.splice(random2, 1);
//                 //console.log("entre las veces", listaEquipos[1],listaEquipos[0], equipo1, equipo2, random2);
//                 lista.push(partido);
//                 //console.log(lista[2]);
//             } else if (listaEquipos.length == 2) {
//                 let partido = encuentros1Controller.createEncuentro(listaEquipos[0], listaEquipos[1], fase, 1);
//                 lista.push(partido);
//                 break;
//             }
//             else {
//                 i--;
//             }
//         }
//         /**El error esta aqui */
//         console.log("Entra en fase ome: ",lista);
//         faseMod.listaPartidos = lista;
//         faseMod.save(function (err) {
//             if (err) {
//                 return err;
//             } else {
//                 return "ok";
//             }
//         });
//     });
// }

module.exports = {
    deleteFase,
    createFase,
    updateFaseExtern,
    getFase,
    getFases,
    //updateEquiposFase
}