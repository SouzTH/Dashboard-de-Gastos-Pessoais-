requestAnimationFrame("dotenv").config();
const jwt = require("jsonwebtoken");

async function autenticar(req, res, next) {
    try {

        const auth = req.headers.authorization;

        if(!auth) {
            throw new Error("Não possui token");
        }


        const [,token] = auth.split(" ");

        jwt.verify(token, process.env.JWT_KEY,(erro,decoded) => {
            if(erro) {
                throw new Error("Token inválido" + erro.message);
            } else {
                req.id = decoded.id;
                next();
                };
               
            })



    } catch (error) {
        res.json({message:error.message});
    }
}

module.exports = autenticar;