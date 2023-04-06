import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConf from '../../config/auth';
import Fornecedores from '../models/Fornecedor';

class AuthControllerFornecedor {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação!' })
        }

        const { email, password } = req.body;
        const fornecedor = await Fornecedores.findOne({ where: { email } });

        if (!fornecedor) {
            return res.status(401).json({ error: 'Usuário não encontrado!' })
        }

        if (!(await fornecedor.checkPassword(password))) {
            return res.status(401).json({ error: 'Senha inválida!' })
        }

        const { id, name, acesso, nivel } = fornecedor;

        return res.json({
            fornecedor: { id, name, email, acesso, nivel },
            token: jwt.sign({ id }, authConf.secret, {
                expiresIn: authConf.expiresIn
            }),
        });
    }
}

export default new AuthControllerFornecedor();