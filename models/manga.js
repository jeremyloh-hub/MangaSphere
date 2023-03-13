const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  {
    timestamps: true,
  }
);

const mangaSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    synopsis: { type: String, required: true },
    author: { type: String, required: true },
    picture: { type: String, required: true },
    chapters: { type: Number, required: true },
    volumes: { type: Number, required: true },
    status: { type: String, required: true },
    genres: [{ type: String, required: true }],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Manga = mongoose.model("Manga", mangaSchema);

module.exports = Manga;
