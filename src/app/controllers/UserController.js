import User from "../models/User";
import * as Yup from "yup";

class UserController {
    async store(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().min(8).required(),
                telefone: Yup.string().required(),
                cidade: Yup.string().required()
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).jsont({ message: "Erro na validação!" })
            }

            const data = req.body;
            const userExists = await User.findOne({
                where: { email: data.email }
            });
            if (userExists) {
                return res.status(400).json({ error: "E-mail já cadastrado!" });
            }

            const { id, name, email, telefone, cidade } = await User.create(data);
            return res.status(200).json({ id, name, email, telefone, cidade });

        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: 'Não foi possível registrar o usuário!' });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string(),
                email: Yup.string().email(),
                telefone: Yup.string(),
                cidade: Yup.string(),
                oldPassword: Yup.string().min(6),
                password: Yup.string().min(8).when('oldPassword', (oldPassword, field) => {
                    oldPassword ? field.required() : field
                }),
                confirmPassword: Yup.string().when('password', (password, field) => {
                    password ? field.required().oneOf([Yup.ref('password')]) : field
                }),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ message: "Erro na validação!" })
            }

            const { email, oldPassword } = req.body;

            //Verificação de email caso usuário queira alterá - lo.
            const user = await User.findByPk(req.userId);
            if (email !== user.email) {
                const userExists = await User.findOne({ where: { email } });
                if (userExists) {
                    return res.status(400).json({ message: "E-mail já cadastrado!" })
                }
            }

            //Verifica se informou a senha antiga, ou seja, quer alterar a senha
            if (oldPassword && !(await user.checkPassword(oldPassword))) {
                return res.status(401).json({ message: "Senha incorreta!" })
            }

            const { id, name, telefone, cidade } = await user.update(req.body);

            return res.status(200).json({ id, name, email, telefone, cidade });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: 'Não foi possível alterar os dados!' });
        }
    }
}

export default new UserController();