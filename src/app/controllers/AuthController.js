import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConf from '../../config/auth';
import User from '../models/User';

class AuthController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação!' })
        }

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado!' })
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Senha inválida!' })
        }

        const { id, name, telefone, cidade, endereco, acesso, nivel } = user;

        return res.json({
            user: { id, name, email, telefone, cidade, endereco, acesso, nivel },
            token: jwt.sign({ id }, authConf.secret, {
                expiresIn: authConf.expiresIn
            }),
        });
    }
}

export default new AuthController();