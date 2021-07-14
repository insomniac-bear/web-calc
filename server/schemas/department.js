const { Schema, model, Types } = require('mongoose');

const rateSchema = new Schema({
  rateName: {
    type: String,
    required: true,
  },
  rateForTwoMoversCashPayment: {
    type: String,
    required: true,
  },
  extraAmmountForCardPayment: {
    type: String,
    required: true,
  },
  ratePerExtraMover: {
    type: String,
    required: true,
  },
  ratePerExtraTruck: {
    type: String,
    required: true,
  }
});

const distinationSchema = new Schema({
  fee: {
    type: String,
    required: true,
  },
  miles: {
    type: String,
    required: true,
  }
});

const truckSchema = new Schema({
  truckReservation: {
    type: String,
    required: true,
  },
  distination: {
    type: distinationSchema,
    required: true,
  },
});

const salaryExpensesSchema = new Schema({
  foreman: {
    type: String,
    required: true,
  },
  helper: {
    type: String,
    require: true,
  },
  helperAndCar: {
    type: String,
    require: true,
  },
});

const fuelExpensesSchema = new Schema({
  fuelPricePerGalon: {
    type: String,
    required: true,
  },
  milesPerGalon: {
    type: String,
    required: true,
  },
  extraAmountPerJob: {
    type: String,
    required: true,
  },
  extraAmountPerTruck: {
    type: String,
    required: true,
  },
  expraPriceForEachRate: {
    type: String,
    required: true,
  },
  extraPriceType: {
    type: String,
    required: true,
  },
});

const driveTimeSchema = new Schema({
  shortDistance: {
    type: String,
    required: true,
  },
  mediumDistance: {
    type: String,
    required: true,
  },
  longDistance: {
    type: String,
    required: true,
  }
});

const departmentBodySchema = new Schema({
  rates: {
    type: [ rateSchema ],
    required: true,
  },
  truckFee: {
    type: truckSchema,
    required: true,
  },
  extraOptions: {
    havyItemCharge: {
      type: String,
      required: true,
    },
    shuttleCharge: {
      type: String,
      required: true,
    },
    typeCharge: {
      type: String,
      required: true,
    },
  },
  packing: {
    firstBedroomKit: {
      type: String,
      required: true,
    },
    secondBedroomKit: {
      type: String,
      required: true,
    },
    thirdBedroomKit: {
      type: String,
      required: true,
    },
    fourthBedroomKit: {
      type: String,
      required: true,
    },
    fifthBedroomKit: {
      type: String,
      required: true,
    },
    sixthBedroomKit: {
      type: String,
      required: true,
    },
    seventhBedroomKit: {
      type: String,
      required: true,
    },
    eighthBedroomKit: {
      type: String,
      required: true,
    },
    ninethBedroomKit: {
      type: String,
      required: true,
    },
    tenthBedroomKit: {
      type: String,
      required: true,
    },
    kitchenPackingKit: {
      type: String,
      required: true,
    },
    taxOnPacking: {
      type: String,
      required: true,
    },
    smallBox: {
      type: String,
      required: true,
    },
    mediumBox: {
      type: String,
      required: true,
    },
    largBox: {
      type: String,
      required: true,
    },
    rollOfPackingPaper: {
      type: String,
      required: true,
    },
    rollOfBubbleWrap: {
      type: String,
      required: true
    }
  },
  longDistance: {
    salaryExpenses: {
      type: salaryExpensesSchema,
      required: true,
    },
    fuelExpenses: {
      type: fuelExpensesSchema,
      required: true,
    },
    driveTime: {
      type: driveTimeSchema,
      required: true,
    },
    truckRoundUp: {
      type: Boolean,
      required: true,
    }
  },
});

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
    companyId: {
      type: Types.ObjectId,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    departments: {
      type: [ departmentBodySchema ],
      required: true,
    }
  },
  {versionKey: false, timestamps: true}
);

const Department = model('Department', departmentSchema);

module.exports = Department;
