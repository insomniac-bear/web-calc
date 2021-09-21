/**
 * Function for round up value to 0,05
 * @param {String} num - allCubicFt
 * @returns {Number} Truck value round up to 0.05
 */
export const truckRoundTo05 = (num) => {
  const param = Number(num);
  const resultOfDivision = param / 1400;

  if (param === 0) {
    return Number(0);
  }

  const FACTOR = 0.05;
  const result = (Math.ceil(resultOfDivision/FACTOR)*FACTOR).toFixed(2);

  return Number(result);
};

/**
 * Function for round up to 0,25
 * @param {String} num - value for round
 * @returns {Number} result - rounded value
 */
export const truckRoundTo25 = (num = 0) => {
  const param = Number(num);

  if (param === 0) {
    return Number(0);
  }

  let fractionalRoundUp;

  const resultDivision = (param / 1400)
  const floorOfDivision =  Math.trunc(param / 1400);
  const fractionalPart = ((resultDivision - floorOfDivision).toFixed(2) * 100).toFixed();
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

/**
 * function fo round up to a larger integer
 * @param {String} allCubicFt 
 * @returns {Number} round up allCubicFt / 1400 to a larger integer
 */
export const trucksRoundUpToOne = (allCubicFt = 0) => {
  const param = Number(allCubicFt);

  if (param === 0) {
    return Number(0);
  }

    const resultOfDivision = param / 1400;

    const result = Math.ceil(resultOfDivision);
    return Number(result);
};

/**
 * function fo round down to a smaller integer
 * @param {String} allCubicFt 
 * @returns {Number} round down allCubicFt / 1400 to a smaller integer
 */
 export const trucksRoundDownToOne = (allCubicFt = 0) => {
  const param = Number(allCubicFt);

  if (param === 0) {
    return Number(0);
  }

    const resultOfDivision = param / 1400;

    const result = Math.floor(resultOfDivision);
    return Number(result);
};

/**
 * function fo calculate param "trucks5PercentForBiggest"
 * @param {String} allCubicFt 
 * @returns result of function trucksRoundDownToOne or trucksRoundUpToOne
 */
export const trucks5PercentForBiggest = (allCubicFt = 0) => {
  const param = Number(allCubicFt);

  if (param === 0) {
    return 0;
  }

  return trucksRoundUpToOne - truckRoundTo05 >= 0.95 ? trucksRoundDownToOne(allCubicFt) : trucksRoundUpToOne(allCubicFt);
};
