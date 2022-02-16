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
    published: {
      type: Boolean, 
      default: true
    } ,
    moderated: {
      type: Boolean,
      default: true
    },
    caseId: {
      type: Schema.Types.ObjectId,
      ref: 'Case'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
