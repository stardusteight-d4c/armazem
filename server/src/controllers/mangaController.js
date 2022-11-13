import Manga from '../models/mangaModel.js'

export const addManga = async (req, res, next) => {
  try {
    const { data } = req.body

    await Manga.create({
      ...data,
    })

    console.log(data)

    return res
      .status(200)
      .json({ status: true, msg: 'New manga added to the database' })
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error adding new manga to database',
      error: error.message,
    })
  }
}
