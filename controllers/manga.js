const User = require("../models/user");
const Manga = require("../models/manga");

const showHome = async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.render("index", { mangas });
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

module.exports = {
  showHome,
  showManga,
};
