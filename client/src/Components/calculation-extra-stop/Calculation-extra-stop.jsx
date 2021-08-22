// Third party libraries
import React from 'react';
import { nanoid } from 'nanoid';
// Components
import { CalculationCommonLabel } from '../calculation-common-label/Calculation-common-label';
// Util
import { parseName } from '../../util/utils';
// Styles
import styles from './CalculationExtraStop.module.css';

export const CalculationExtraStop = ({ extraStop, groupInputChange, lastTarget, index }) => {
  const extraKey = Object.keys(extraStop);

  return(
    <fieldset className={styles.container}>
      <legend className={styles.title}>Extra stop #{index + 1}</legend>
      {
        extraKey.map((key) => {
          return(
            <CalculationCommonLabel
              key={nanoid(extraKey.length)}
              title={parseName(key)}
              placeholder={'ex: 3'}
              value={extraStop[key]}
              inputName={key}
              changeValue={(evt) => groupInputChange(evt, index)}
              isFocused={lastTarget === key}
            />
          );
        })
      }
    </fieldset>
  );
}
