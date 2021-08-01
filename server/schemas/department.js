const { Schema, model, Types } = require('mongoose');

const departmentSchema= new Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true,
    },
    dateCreate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    authorId: {
      type: Types.ObjectId,
      required: true,
    },
    companyId: {
      type: Types.ObjectId,
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
