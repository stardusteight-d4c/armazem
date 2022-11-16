import Manga from '../models/mangaModel.js'
import Account from '../models/accountModel.js'
import Review from '../models/reviewModel.js'
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
    const skip = (page - 1) * 10

    // 10 out of 10 pagination
    const mangas = await Manga.find()
      .select('uid cover -_id')
      .skip(skip)
      .limit(10)

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
    const mangas = await Manga.find({ genres: genre }).select('uid cover -_id')

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    next(error)
  }
}

export const mangaByGenreAndTitle = async (req, res, next) => {
  try {
    const genre = req.params.genre
    const title = req.params.title

    const mangas = await Manga.find({
      title: { $regex: new RegExp(title, 'i') },
      genres: genre,
    }).select('uid cover -_id')

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    next(error)
  }
}

export const addMangaToListed = async (req, res, next) => {
  try {
    const { accountId, data } = req.body

    console.log()

    const mangaAlreadyListed = await Account.findOne({
      accountId,
      'mangaList.mangaUid': data.mangaUid,
    })

    // mangaAlreadyListed is null -> 'ADD', otherwise -> 'DELETE' and 'ADD NEW'
    if (mangaAlreadyListed === null) {
      await Account.findByIdAndUpdate(
        accountId,
        {
          $push: { mangaList: { ...data } },
        },
        { safe: true, multi: false }
      )
    } else {
      await Account.findByIdAndUpdate(
        accountId,
        {
          $pull: { mangaList: { mangaUid: data.mangaUid } },
        },
        { safe: true, multi: false }
      )
      await Account.findByIdAndUpdate(
        accountId,
        {
          $push: { mangaList: { ...data } },
        },
        { safe: true, multi: false }
      )
    }

    const scoreAlreadyExist = await Manga.findOne({
      uid: data.mangaUid,
      'score.accountId': accountId,
    })

    // scoreAlreadyExist is null -> 'ADD', otherwise -> 'UPDATE'
    if (data.status !== 'Plan to Read') {
      if (scoreAlreadyExist === null) {
        await Manga.findOneAndUpdate(
          { uid: data.mangaUid },
          {
            $push: { score: { accountId: accountId, score: data.score } },
          },
          { safe: true, multi: false }
        )
      } else {
        await Manga.findOneAndUpdate(
          { uid: data.mangaUid, 'score.accountId': accountId },
          {
            $pull: { score: { accountId: accountId } },
          },
          { safe: true, multi: false }
        )
        await Manga.findOneAndUpdate(
          { uid: data.mangaUid },
          {
            $push: { score: { accountId: accountId, score: data.score } },
          },
          { safe: true, multi: false }
        )
      }
    } else {
      await Manga.findOneAndUpdate(
        { uid: data.mangaUid, 'score.accountId': accountId },
        {
          $pull: { score: { accountId: accountId } },
        },
        { safe: true, multi: false }
      )
    }

    if (data.status !== 'Plan to Read') {
      await Manga.findOneAndUpdate(
        { uid: data.mangaUid },
        {
          $addToSet: { readers: accountId },
        },
        { safe: true, multi: false }
      )
    } else {
      await Manga.findOneAndUpdate(
        { uid: data.mangaUid },
        {
          $pull: { readers: accountId },
        },
        { safe: true, multi: false }
      )
    }

    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully' })
  } catch (error) {
    next(error)
  }
}

export const removeMangaToListed = async (req, res, next) => {
  try {
    const { accountId, mangaUid } = req.body

    await Account.findByIdAndUpdate(
      accountId,
      {
        $pull: { mangaList: { mangaUid: mangaUid } },
      },
      { safe: true, multi: false }
    )

    await Manga.findOneAndUpdate(
      { uid: mangaUid, 'score.accountId': accountId },
      {
        $pull: { score: { accountId: accountId } },
      },
      { safe: true, multi: false }
    )

    await Manga.findOneAndUpdate(
      { uid: mangaUid },
      {
        $pull: { readers: accountId },
      },
      { safe: true, multi: false }
    )

    return res.status(200).json({ status: true, msg: 'Successfully removed' })
  } catch (error) {
    next(error)
  }
}

export const addReview = async (req, res, next) => {
  try {
    const { from, by, review, authorImage, authorUsername } = req.body
    const reviewDoc = await Review.create({
      from,
      by,
      authorImage,
      authorUsername,
      review,
    })

    await Manga.findOneAndUpdate(
      { uid: from },
      {
        $addToSet: { reviews: reviewDoc._id },
      }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'The review has been added' })
  } catch (error) {
    next(error)
  }
}

export const reviewsByPagination = async (req, res, next) => {
  try {
    const { uid, page } = req.params
    const skip = (page - 1) * 3

    const reviews = await Review.find({ from: uid }).skip(skip).limit(3)

    return res.status(200).json({ status: true, reviews })
  } catch (error) {
    next(error)
  }
}

export const review = async (req, res, next) => {
  try {
    const id = req.params.id

    const review = await Review.findById(id)

    return res.status(200).json({ status: true, review })
  } catch (error) {
    next(error)
  }
}

export const randomMangasByGenre = async (req, res, next) => {
  try {
    const genre = req.params.genre

    const mangas = await Manga.find({ genres: genre }).select('uid cover score -_id').limit(10)

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
    }

    shuffleArray(mangas)

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    next(error)
  }
}
