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

  const result = Number(cubicFt) + totalExtraCubicFt + (Number(totalSmallBoxes) + totalExtraSmallBoxes) * 3 + (Number(totalMediumBoxes) + totalExtraMediumBoxes) * 3 + (Number(fragileBoxes) + totalExtraFragileBoxes) * 1.5;

  return result.toFixed(2);
};

/**
 * Function for calculate total count of small boxes
 * @param {Object} commonValues
 * @param {String} key - name of key, wich hold a number of some box
 * @returns {Number} total count of all small boxes
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
 * 
 * @param {String} num - allCubicFt
 * @returns {Number} Truck value round up to 0.05
 */
const truckRoundTo05 = (num) => {
  const param = Number(num);

  if (param === 0) {
    return Number(0);
  }

  let fractionalRoundUp;

  const resultDivision = (param / 1400).toFixed(2);
  const floorOfDivision =  Math.floor(param / 1400);
  const fractionalPart = ((resultDivision - Math.floor((param / 1400).toFixed(2))).toFixed(2) * 100).toFixed();

  if (fractionalPart > 95) {
    return Number((floorOfDivision + 1).toFixed(2));
  }
  
  if (fractionalPart < 10) {
    fractionalRoundUp = String(fractionalPart)[0] <= 5 ? '05' : '10';
  } else {
    fractionalRoundUp = String(fractionalPart)[1] <= 5 ? String(fractionalPart)[0] + '5' : String(Number(String(fractionalPart)[0]) + 1) + '0';
  }

  const result = String(floorOfDivision) + '.' + String(fractionalRoundUp);

  return Number(result);
};

const truckRoundTo25 = (num) => {
  const param = Number(num);

  if (param === 0) {
    console.log(param)
    return Number(0);
  }

  let fractionalRoundUp;

  const resultDivision = (param / 1400).toFixed(2);
  const floorOfDivision =  Math.floor(param / 1400);
  const fractionalPart = ((resultDivision - Math.floor((param / 1400).toFixed(2))).toFixed(2) * 100).toFixed();

  if (fractionalPart <= 0.000001) {
    return Number(floorOfDivision).toFixed(2);
  } else if (fractionalPart > 0 && fractionalPart <= 25) {
    fractionalRoundUp = 25;
  } else if (fractionalPart > 25 && fractionalPart <= 50) {
    fractionalRoundUp = 50;
  } else if (fractionalPart > 50 && fractionalPart <= 75) {
    fractionalRoundUp = 75;
  } else if (fractionalPart > 75) {
    return Number(floorOfDivision + 1).toFixed(2);
  }

  const result = String(floorOfDivision) + '.' + String(fractionalRoundUp);

  return Number(result);
};

export const calculateOfMovers = (num = 0) => {
  const cubicFt = Number(num);

  if (cubicFt <= 0.000001) {
    return 0;
  }

  const moversAjasment = truckRoundTo25(cubicFt) - truckRoundTo05(cubicFt);

  const moversRoundUp = Math.ceil(truckRoundTo05(cubicFt) * 4) < 2 ? 2 : Math.ceil(truckRoundTo05(cubicFt) * 4);
  const moversRoundDown = Math.floor(truckRoundTo05(cubicFt) * 4) < 2 ? 2 : Math.floor(truckRoundTo05(cubicFt) * 4);

  return moversAjasment >= 0.2 ? moversRoundDown : moversRoundUp;
};
