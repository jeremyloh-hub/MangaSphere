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
      const manga = await Manga.findOne({ _id: mangaID }).exec();
      const review = manga.reviews.id(reviewID);
      res.render("mangas/edit", { mangaID, reviewID, userID, review });
    } else {
      res.redirect(`/mangas/member/${mangaID}`);
    }
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

module.exports = {
  showHome,
  showManga,
  addReview,
  showHomeMem,
  showMangaMem,
  showEdit,
};