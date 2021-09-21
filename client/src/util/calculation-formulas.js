import { truckRoundTo05, truckRoundTo25, trucks5PercentForBiggest, trucksRoundUpToOne } from './calculation-util';

/**
 * Function for calculate total count of cubic ft.
 * @param {Object} commonValues - common values
 * @returns {Number} Total count of cubic ft.
 */
export const totalCubicFt = (commonValues) => {
  const { cubicFt = 0, extraStops = [], totalSmallBoxes = 0, totalMediumBoxes = 0, fragileBoxes = 0 } = commonValues
  let totalExtraCubicFt = 0;
  let totalExtraSmallBoxes = 0;
  let totalExtraMediumBoxes = 0;
  let totalExtraFragileBoxes = 0;

  if (extraStops && extraStops.length > 0) {
    totalExtraCubicFt = extraStops.reduce((acc, extraStop) => {
      const currentItem = Number(extraStop.cubicFt);
      return acc + currentItem;
    }, 0);

    totalExtraSmallBoxes = extraStops.reduce((acc, extraStop) => {
      const currentItem = Number(extraStop.totalSmallBoxes);
      return acc + currentItem;
    }, 0);

    totalExtraMediumBoxes = extraStops.reduce((acc, extraStop) => {
      const currentItem = Number(extraStop.totalMediumBoxes);
      return acc + currentItem;
    }, 0);

    totalExtraFragileBoxes = extraStops.reduce((acc, extraStop) => {
      const currentItem = Number(extraStop.fragileBoxes);
      return acc + currentItem;
    }, 0);
  }

  const result = Number(cubicFt) + totalExtraCubicFt + (Number(totalSmallBoxes) + totalExtraSmallBoxes) * 1.5 + (Number(totalMediumBoxes) + totalExtraMediumBoxes) * 3 + (Number(fragileBoxes) + totalExtraFragileBoxes) * 1.5;

  return result.toFixed(2);
};

/**
 * function for calculate all count of miles
 * @param {Object} commonValues - values with common params of calculate
 * @returns {Number} - total count of miles
 */
 export const totalMiles = (commonValues) => {

  const { miles = 0, extraStops = [] } = commonValues
  let totalExtraMiles = 0;

  if (extraStops && extraStops.length > 0) {
    totalExtraMiles = extraStops.reduce((acc, extraStop) => {
      const currentItem = Number(extraStop.miles);
      return acc + currentItem;
    }, 0);
  }

  const result = Number(miles) + totalExtraMiles;

  return result.toFixed(2);
};

/**
 * Function for calculate total count of boxes
 * @param {Object} commonValues
 * @param {String} key - name of key, wich hold a number of some box
 * @returns {Number} total count of all boxes with [key] name
 */
export const totalBoxes = (commonValues, key) => {
  const { extraStops = [] } = commonValues;
  const totalBoxes = commonValues[key];

  let totalExtraBoxes = 0;

  totalExtraBoxes = extraStops.reduce((acc, extraStop) => {
    const currentItem = Number(extraStop[key]);
    return acc + currentItem;
  }, 0);

  const result = Number(totalBoxes) + totalExtraBoxes;

  return result.toFixed();
};

/**
 * Function for calculate count of movers
 * @param {Object} commonValues
 * @param {Object} localValues
 * @returns {Number} count of movers
 */
export const calculateOfMovers = (commonValues, localValues) => {
  const packingMover = commonValues.packing === 'No' ? 0 : 1;
  const cubicFt = Number(totalCubicFt(commonValues));

  if (cubicFt <= 0.000001) {
    return 0;
  }

  const moversAjasment = (truckRoundTo25(cubicFt) - truckRoundTo05(cubicFt)).toFixed(1);

  const moversRoundUp = Math.ceil(truckRoundTo05(cubicFt) * 4) < 2 ? 2 : Math.ceil(truckRoundTo05(cubicFt) * 4);
  const moversRoundDown = Math.floor(truckRoundTo05(cubicFt) * 4) < 2 ? 2 : Math.floor(truckRoundTo05(cubicFt) * 4);

  const result = moversAjasment >= 0.2 ? Number(moversRoundDown) : Number(moversRoundUp);
  return result + Number(packingMover) + Number(localValues.addMovers) - Number(localValues.removeMovers);
};

/**
 * Function for calculate not rounded total trucks
 * @param {Object} commonValues 
 * @returns {String} not rounded total trucks
 */
export const totalTrucks = (commonValues) => {
  const cubicFt = Number(totalCubicFt(commonValues));
  return (cubicFt / 1400).toFixed(2);
};

/**
 * function for calculatecounts of trucks for one trip
 * @param {Object} commonValues 
 * @returns {Number} - counts of trucks for one trip
 */
export const trucksForOneTrip = (commonValues) => {
  const cubicFt = Number(totalCubicFt(commonValues));
  return totalMiles(commonValues) >=1 ? trucksRoundUpToOne(cubicFt) : trucks5PercentForBiggest(cubicFt);
};

/**
 * 
 * @param {Object} commonValues 
 * @returns {Boolean} - get biggest truck or not
 */
export const biggestTruck = (commonValues) => {
  const cubicFt = Number(totalCubicFt(commonValues));
  return truckRoundTo05(cubicFt) - trucksForOneTrip(commonValues) > 0 ? true : false;
};

/**
 * function for calculate is one trip or two?
 * @param {Object} commonValues 
 * @param {Object} localValues 
 * @returns {Boolean} return true or false - is one trip or is two trip
 */
export const isOneTrip = (commonValues, localValues) => {
  if (localValues.noTwoTrips) {
    return true;
  }

  const miles = totalMiles(commonValues);
  const cubicFt = totalCubicFt(commonValues);

  if (miles < 10 && truckRoundTo05(cubicFt) > 1) {
    return false;
  }

  return true;
}

export const numberOfTrucks = (commonValues, localValues) => {
  if (isOneTrip(commonValues, localValues) || (biggestTruck(commonValues) && !isOneTrip(commonValues, localValues))) {
    return trucksForOneTrip(commonValues) - localValues.removeTrucks;
  }

  return trucksForOneTrip(commonValues) - 1;
}
