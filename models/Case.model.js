const { Schema, model } = require("mongoose");


const caseSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    description: {
      type: String,
      required: [true, 'Informa sobre el caso'],
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number]
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    admitteComments: {
      type: String,
      enum: ['on', 'off'],
      default: 'off'
    },
    published: Boolean,
    moderated: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = model("Case", caseSchema);
