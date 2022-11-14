import Manga from '../models/mangaModel.js'
import ShortUniqueId from 'short-unique-id'

export const addManga = async (req, res, next) => {
  try {
    const { data } = req.body
    const uid = new ShortUniqueId({ length: 10 })
    const mangaId = uid()

    const alreadyExist = await Manga.findById(data._id)
    if (alreadyExist) {
      await Manga.findByIdAndUpdate(
        data._id,
        { $set: { ...data } },
        { safe: true, upsert: true }
      )
    } else {
      await Manga.create({
        uid: mangaId,
        ...data,
      })
    }

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

export const searchByTitle = async (req, res, next) => {
  try {
    const query = req.body.query
    const mangas = await Manga.find({
      title: { $regex: new RegExp(query, 'i') },
    }).limit(5)

    return res.json({ mangas })
  } catch (error) {
    next(error)
  }
}

export const mangaByPagination = async (req, res, next) => {
  try {
    const page = req.params.page
    const skip = (page - 1) * 5

    console.log(skip)

    // 5 out of 5 pagination
    const mangas = await Manga.find().select('uid cover -_id').skip(skip).limit(5)

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    next(error)
  }
}

export const mangaByUid = async (req, res, next) => {
  try {
    const uid = req.params.uid

    const manga = await Manga.findOne({ uid: uid })

    return res.status(200).json({ status: true, manga })
  } catch (error) {
    next(error)
  }
}

export const mangaByGenre = async (req, res, next) => {
  try {
    const genre = req.params.genre
    const mangas = await Manga.find({ genres: genre })

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    next(error)
  }
}

export const mangaByGenreAndTitle = async (req, res, next) => {
  try {
    const genre = req.params.genre
    const title = req.params.title

    console.log('genre', genre)
    console.log('title', title)

    const mangas = await Manga.find({
      title: { $regex: new RegExp(title, 'i') },
      genres: genre,
    })

    console.log(mangas)

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    next(error)
  }
}
