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
    const mangas = await Manga.find({ _id: id });
    res.render("mangas/index", { mangas });
  } catch (error) {
    console.log(erorr);
  }
};

const showMangaMem = async (req, res) => {
  try {
    const { id } = req.params;
    const mangas = await Manga.find({ _id: id });
    res.render("mangas/member", { mangas });
  } catch (error) {
    console.log(erorr);
  }
};

const addReview = async (req, res) => {
  try {
    const user = req.session.userid;
    const { id } = req.params;
    const { content, rating } = req.body;
    const review = { content, rating };

    const mangas = await Manga.findById(id);
    mangas.reviews.push(review);
    await mangas.save();
    res.redirect(`/mangas/${id}`);
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
};
