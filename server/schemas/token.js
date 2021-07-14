const {Schema, model, Types} = require('mongoose');

const tokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

const Token = model('Token', tokenSchema);

module.exports = Token;
