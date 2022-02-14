const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: [true, 'Escribe un comentario'],
    },
    publishedTime: {
      date: Date
    },
    published: Boolean,
    moderated: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
