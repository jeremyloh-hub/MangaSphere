const User = require("../models/user");
const Manga = require("../models/manga");

const showHome = async (req, res) => {
  try {
    const pattern = req.query.title;
    const re = new RegExp(pattern);
    const mangas = await Manga.find({ title: re });
    res.render("index", { mangas });
  } catch (error) {
    console.log(error);
  }
};

const showHomeMem = async (req, res) => {
  try {
    const pattern = req.query.title;
    const re = new RegExp(pattern);
    const mangas = await Manga.find({ title: re });
    res.render("member", { mangas });
  } catch (error) {
    console.log(error);
  }
};

const showManga = async (req, res) => {
  try {
    const { id } = req.params;
    const mangas = await Manga.find({ _id: id }).populate({
      path: "reviews",
      populate: { path: "user" },
    });
    res.render("mangas/index", { mangas });
  } catch (error) {
    console.log(error);
  }
};

const showMangaMem = async (req, res) => {
  try {
    const { id } = req.params;
    const mangas = await Manga.find({ _id: id }).populate({
      path: "reviews",
      populate: { path: "user" },
    });
    res.render("mangas/member", { mangas });
  } catch (error) {
    console.log(error);
  }
};

const addReview = async (req, res) => {
  try {
    const user = req.session.userid;
    const { id } = req.params;
    const { content, rating } = req.body;
    const review = { user, content, rating };

    const mangas = await Manga.findById(id);
    mangas.reviews.push(review);
    await mangas.save();
    res.redirect(`/mangas/member/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const showEdit = async (req, res) => {
  const { mangaID, reviewID, userID } = req.params;
  const session = req.session.userid;

  try {
    if (userID === session) {
      const mangas = await Manga.findOne({ _id: mangaID }).exec();
      const review = mangas.reviews.id(reviewID);
      res.render("mangas/edit", { mangaID, reviewID, userID, review });
    } else {
      res.redirect(`/mangas/member/${mangaID}`);
    }
  } catch (err) {
    console.error(err);
  }
};

const editReview = async (req, res) => {
  const { mangaID, reviewID } = req.params;
  const { rating, content } = req.body;
  try {
    const mangas = await Manga.findOne({ _id: mangaID }).exec();
    const review = mangas.reviews.id(reviewID);
    review.content = content;
    review.rating = rating;
    await mangas.save();
    res.redirect(`/mangas/member/${mangaID}`);
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (req, res) => {
  const { mangaID, reviewID, userID } = req.params;
  const session = req.session.userid;
  try {
    if (userID === session) {
      const mangas = await Manga.findOne({ _id: mangaID }).exec();
      const review = mangas.reviews.id(reviewID);
      review.deleteOne({ _id: reviewID });
      await mangas.save();
      res.redirect(`/mangas/member/${mangaID}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  showHome,
  showManga,
  addReview,
  showHomeMem,
  showMangaMem,
  showEdit,
  editReview,
  deleteReview,
};
