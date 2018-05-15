const jwt = require("jwt-simple");
const moment = require("moment");
const secretToken = "67a9791a86ec446b582d39e079d14c08";

var createToken = function(user) { 
  const payload = {
    sub: user.nombreUsuario,
    creaToken: moment().unix(),
    expiratoken: moment()
      .add(1, "days")
      .unix()
  };
  return jwt.encode(payload, secretToken);
};

var decodeToken = function(token) {
  const decoded = new Promise(function(resolve, reject) {
    try {
      const payload = jwt.decode(token, secretToken);
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "El token ha expirado"
        });
      }
      resolve(payload.sub);
    } catch (err) {
      reject({
        status: 500,
        message: "Token invalido"
      });
    }
  });
  return decoded;
};

module.exports = {
  createToken,
  secretToken,
  decodeToken
};
