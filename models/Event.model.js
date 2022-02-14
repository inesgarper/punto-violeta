const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Indica el nombre del evento'],
      unique: true,
      trim: true
    },
    type: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Informa sobre el evento'],
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number],
      required: [true, 'Debes marcar sobre el mapa el lugar donde ocurrió']
    },
    start: {
      date: Date
    },
    end: {
      date: Date
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    eventImg: {
      type: String,
    },
    published: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);
