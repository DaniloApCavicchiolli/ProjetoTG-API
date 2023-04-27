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
            return res.status(200).json(catego);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Não foi possível cadastrar o Categoria' })
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
            return res.json({ message: 'Não foi possível mostrar as categorias' })
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
            return res.json({ message: 'Não foi possível mostrar o Categoria' })
        }
    }

    /* Editar categoria */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            const data = req.body;

            const categoriaExists = await Categoria.findOne({
                where: { nome }
            });
            if (categoriaExists) {
                return res.status(400).json({ message: "Categoria já cadastrada!" });
            }

            const categoria = await Categoria.findByPk(id);
            const response = await categoria.update(data);

            return res.status(200).json(response)
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Não foi possível editar a Categoria' })
        }
    }

    /* Deletar Categoria */
    async destroy(req, res) {
        try {
            const { id } = req.params;

            await Categoria.destroy({
                where: { id }
            });

            return res.status(200).json({ message: 'Deletado com sucesso!' })
        } catch (err) {
            return res.status(400).json({ message: 'Não foi possível deletar o Categoria!' })
        }
    }
}

export default new CategoriaController();