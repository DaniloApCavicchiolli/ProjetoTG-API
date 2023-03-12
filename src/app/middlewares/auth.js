import jwt from "jsonwebtoken";
import { promisify } from "util"; //Converte uma função que não retorna uma promise para uma que retorna.
import authConfig from "../../config/auth";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Não há token!" })
    };

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);//Sem a promisify não daria para usar o await nesta função: jwt.verify
        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido!" })
    }
};