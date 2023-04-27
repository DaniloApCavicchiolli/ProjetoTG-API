import Categoria from "../models/Categoria";

class CategoriaController {

    /* Registrar categorias */
    async store(req, res) {
        try {
            const data = req.body;
            const { nome } = req.body;

            const categoria = await Categoria.findOne({
                where: { nome: nome }
            });
            if (categoria) {
                return res.json({ message: "Categoria já cadastrada!" });
            }

            const catego = await Categoria.create(data);
            return res.stauts(200).json(catego);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Não foi possível criar o Categoria' })
        }
    }

    /* Mostrar todas as categorias - Paginado */
    async index(req, res) {
        try {
            const { page = 0 } = req.query;

            const registros = await Categoria.count();
            const pages = Math.ceil(registros / 5);

            const categorias = await Categoria.findAll({
                limit: 5,
                offset: 5 * page,
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            return res.json({ totalPages: pages, content: categorias });
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Não foi possível mostrar os categorias' })
        }
    }

    /* Mostrar uma Categoria */
    async showOne(req, res) {
        try {
            const { id } = req.params;

            const categoria = await Categoria.findOne({
                where: { id }
            })

            return res.json(categoria)
        } catch (err) {
            return res.json({ error: 'Não foi possível mostrar o Categoria' })
        }
    }

    /* Deletar Categoria */
    async destroy(req, res) {
        try {
            const { id } = req.params

            await Categoria.destroy({
                where: { id }
            })

            return res.json({ message: 'Deletado com sucesso!' })
        } catch (err) {
            return res.json({ error: 'Não foi possível deletar o Categoria!' })
        }
    }
}

export default new CategoriaController();