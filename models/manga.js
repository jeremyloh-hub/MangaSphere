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
    content: { type: String, required: true, minLength: 1 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  {
    timestamps: true,
  }
);

const mangaSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, minLength: 1 },
    synopsis: { type: String, required: true, minLength: 1 },
    author: [{ type: String, required: true, minLength: 1 }],
    picture: { type: String, required: true, minLength: 1 },
    chapters: { type: Number, default: null },
    volumes: { type: Number, default: null },
    status: {
      type: String,
      required: true,
      enum: ["Finished", "Publishing", "On Hiatus"],
    },
    genres: [{ type: String, required: true, minLength: 1 }],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Manga = mongoose.model("Manga", mangaSchema);

module.exports = Manga;
