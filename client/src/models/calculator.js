export const calculatorDataModel = {
  calculationNumber: '',
  department: undefined,
  commonValues: {
    packing: 'No',
    baseLoadingHours: 0,
    baseUnloadingHourse: 0,
    cubicFt: 0,
    miles: 0,
    driveTime: 0,
    totalSmallBoxes: 0,
    totalMediumBoxes: 0,
    fragileBoxes: 0,
    shuttle: false,
    liftGate: false,
    hardFloorCovers: false,
    filmFloorCovers: false,
    numOfExtraHeavyItem: 0,
    packingKitOverride: 0,
    cratesCosts: [],
    unpacking: 'No',
    extraStops: [],
  },
  dayPackingNoPacking: {
    name: 'Day - Packing / No packing',
    rate: '',
    moversToLoad: 0,
    addMovers: 0,
    removeMovers: 0,
    moversToDrivesAndUnload: 0,
    removeTrucks: 0,
    noTwoTrips: false,
  },
}