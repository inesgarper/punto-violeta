const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    creator: {
      type: SchemaTypes.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: [true, 'Escribe un comentario'],
    },
    publicationTime: {
      date: Date,
      dateTime: Date,
      timeZone: String
    },
    publicated: Boolean,
    moderated: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
