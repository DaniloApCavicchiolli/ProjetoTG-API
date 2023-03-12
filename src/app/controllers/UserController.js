import User from "../models/User";

class UserController {
    async store(req, res) {
        try {
            const data = req.body;
            const userExists = await User.findOne({
                where: { email: data.email }
            });
            if (userExists) {
                return res.status(400).json({ error: "E-mail já cadastrado!" });
            }

            const {id, name, email, telefone, cidade} = await User.create(data);
            return res.status(200).json({id, name, email, telefone, cidade});

        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: 'Não foi possível registrar o usuário!' });
        }
    }
}

export default new UserController();