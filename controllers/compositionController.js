import {UserOwnComposition} from "../models/UserOwnComposition.js";
const compositionController = {
  saveOwnComposition: async (req, res) => {
    const { id } = req.params

    const { composition_id } = req.body

    let filePath

    if (req.file && req.file.path) {
      filePath = req.file.path;
    }
    try {
      const composition = await UserOwnComposition.create({
        user_id: Number(req.user.user_id),
        composition_id,
        name: filePath,
        file: filePath
      })
      return res.status(200).json(composition)
    } catch (error) {
      console.log(error)
      res.status(500).json({error: 'internal server error'})
    }
  }
}

export default compositionController