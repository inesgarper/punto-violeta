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
      enum: ['clase de defensa personal', 'charla', 'manifestación', 'otro']
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
    start: {
      date: Date,
      dateTime: Date,
      timeZone: String
    },
    end: {
      date: Date,
      dateTime: Date,
      timeZone: String
    },
    creator: {
      type: SchemaTypes.ObjectId,
      ref: 'User'
    },
    eventImg: {
      type: String,
    },
    publicated: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);
