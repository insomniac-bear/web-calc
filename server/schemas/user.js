const { Schema, model, Types } = require('mongoose');

/**
 * Schema of user data structure for save in MongoDB database
 * Next users data save in database:
 * login - authorization user name. Login is unique for each user
 * password - secret word for authorization. Password save hashed
 * role - system has two role: admin, user. Admin can create users
 * companyId - id of company where user works
 */
const userSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
    },
    companyId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
