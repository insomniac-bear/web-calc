const {Schema, model} = require('mongoose');

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Company = model('Company', companySchema);

module.exports = Company;
