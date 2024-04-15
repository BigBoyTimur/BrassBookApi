import {Composition} from "../models/Composition.js";

const compositionsController = {
  getAllCompositions: async (req, res) => {
    const { page, size } = req.params;

    const limit = parseInt(size) || 10; // Количество элементов на странице
    const offset = (parseInt(page) - 1) * limit; // Смещение для пагинации

    try {
      const compositions = await Composition.findAndCountAll({
        limit,
        offset,
        // Здесь вы можете добавить другие условия запроса, если необходимо
      });

      res.json(compositions);
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default compositionsController