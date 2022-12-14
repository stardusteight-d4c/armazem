import Manga from '../models/mangaModel.js'
import Account from '../models/accountModel.js'
import Review from '../models/reviewModel.js'
import Notification from '../models/notificationModel.js'
import ShortUniqueId from 'short-unique-id'

export const addManga = async (req, res) => {
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
      return res
        .status(200)
        .json({ status: true, msg: 'The changes have been saved' })
    } else {
      await Manga.create({
        uid: mangaId,
        ...data,
      })
      const general = {
        type: 'general',
        message: 'has been added to the database',
        infos: [data.title, mangaId],
      }
      await Notification.create({ ...general })
      return res
        .status(200)
        .json({ status: true, msg: 'New manga added to the database' })
    }
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const searchByTitle = async (req, res) => {
  try {
    const query = req.params.query
    const mangas = await Manga.find({
      title: { $regex: new RegExp(query, 'i') },
    }).limit(5)

    return res.json({ mangas })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const mangaByPagination = async (req, res) => {
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
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const mangaByUid = async (req, res) => {
  try {
    const uid = req.params.uid

    const manga = await Manga.findOne({ uid: uid })

    return res.status(200).json({ status: true, manga })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const mangaByGenre = async (req, res) => {
  try {
    const genre = req.params.genre
    const mangas = await Manga.find({ genres: genre }).select('uid cover -_id')

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const mangaByGenreAndTitle = async (req, res) => {
  try {
    const genre = req.params.genre
    const title = req.params.title

    const mangas = await Manga.find({
      title: { $regex: new RegExp(title, 'i') },
      genres: genre,
    }).select('uid cover -_id')

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const addMangaToListed = async (req, res) => {
  try {
    const { accountId, data } = req.body

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
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const removeMangaToListed = async (req, res) => {
  try {
    const { accountId, mangaUid } = req.query

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
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const addReview = async (req, res) => {
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
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const reviewsByPagination = async (req, res) => {
  try {
    const { uid, page } = req.params
    const skip = (page - 1) * 3

    const reviews = await Review.find({ from: uid }).skip(skip).limit(3)

    return res.status(200).json({ status: true, reviews })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const review = async (req, res) => {
  try {
    const id = req.params.id

    const review = await Review.findById(id)

    return res.status(200).json({ status: true, review })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const randomMangasByGenre = async (req, res) => {
  try {
    const genre = req.params.genre

    const mangas = await Manga.find({ genres: genre })
      .select('uid cover score -_id')
      .limit(10)

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
    }

    shuffleArray(mangas)

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const mostRead = async (req, res) => {
  try {
    const mostReads = await Manga.aggregate([
      {
        $set: {
          readers: {
            $size: '$readers',
          },
        },
      },
      {
        $sort: {
          readers: -1,
        },
      },
    ]).limit(10)

    const mangas = mostReads.map((mostRead) => ({
      cover: mostRead.cover,
      uid: mostRead.uid,
      score: mostRead.score,
      title: mostRead.title,
    }))

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}
