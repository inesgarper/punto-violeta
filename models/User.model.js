const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Indica tu nombre de usuario'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Indica tu nombre de usuario']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Indica una contraseña'],
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      enum: ['USER', 'EDITOR', 'ADMIN'],
      default: 'USER'
    },
    event: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    profileImg: {
      type: String,
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
