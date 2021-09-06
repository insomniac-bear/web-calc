export const departmentDataModel = {
  departmentName: '',
  version: 0,
  authorId: '',
  companyId: '',
  rates: {
    rateType: 'discount',
    ratesList: [
      {
        rateName0: '',
        hourlyRate0: '',
        cashDiscount0: '',
        extraMover0: '',
        extraTruck0: '',
      }
    ],
  },
  truckFee: {
    calcMethod: 'simple',
    truckReservation: '',
    truckDestionation: {
      fee: '',
      miles: '',
    },
  },
  extraOptions: {
    havyItem: '',
    shuttle: {
      charge: '',
      period: 'hourly',
    }
  },
  packing: {
    packingKits: {
      firstBedroom: '',
      secondBedroom: '',
      thirdBedroom: '',
      fourthBedroom: '',
      fifthBedroom: '',
      sixthBedroom: '',
      seventhBedroom: '',
      eighthBedroom: '',
      ninethBedroom: '',
      tenthBedroom: '',
      kitchen: '',
      salesTax: '',
    },
    supplies: {
      smallBox: '',
      mediumBox: '',
      largeBox: '',
      packingPapper: '',
      bubbleWrap: '',
    },
    crating: {
      timeToBuildCrate: '',
    },
  },
  longDistance: {
    salaryExpenses: {
      foreman: '',
      helper: '',
      helperPlusCar: '',
    },
    fuelExpenses: {
      fuelPerGalon: '',
      mielsPerGalon: '',
      extraAmountPerJob: '',
      extraAmountPerTruck: '',
      extraForEachRate: {
        extraAmount: '',
        type: 'job',
      },
    },
    driveTime: {
      smallDistance: '',
      mediumDistance: '',
      largeDistance: '',
    },
    roundToFull: true,
  },
};
