const { Schema, model, Types } = require('mongoose');

const departmentSchema= new Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true,
    },
    version: {
      type: Number,
      required: true,
    },
    authorId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyId: {
      type: Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    rates: {
      type: Object,
      required: true,
    },
    truckFee: {
      type: Object,
      required: true,
    },
    extraOptions: {
      type: Object,
      required: true,
    },
    packing: {
      type: Object,
      required: true,
    },
    longDistance: {
      type: Object,
      required: true,
    },
  },
  {versionKey: false, timestamps: true}
);

const Department = model('Department', departmentSchema);

module.exports = Department;
