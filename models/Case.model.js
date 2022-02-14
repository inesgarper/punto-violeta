const { Schema, model } = require("mongoose");


const caseSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    description: {
      type: String,
      required: [true, 'Informa sobre el evento'],
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number]
    },
    publicated: Boolean,
    moderated: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = model("Case", caseSchema);
