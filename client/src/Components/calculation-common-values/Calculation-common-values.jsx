// Third party libraries
import { useState } from 'react';
import { nanoid } from 'nanoid';
// Components
import { CalculationCommonLabel } from '../calculation-common-label/Calculation-common-label';
import { CalculationExtraStop } from '../calculation-extra-stop/Calculation-extra-stop';
import { Icon } from '../Icon';
// Utils
import { parseName } from '../../util/utils';
import { IconNames } from '../../util/const';
// Styles
import styles from './CalculationCommonValues.module.css';

const EXTRA_STOP_DATA_TEMPLATE = {
  baseLoadingHours: '',
  baseUnloadingHourse: '',
  cubicFt: '',
  miles: '',
  driveTime: '',
  totalSmallBoxes: '',
  totalMediumBoxes: '',
  fragileBoxes: '',
};

export const CalculationCommonValues = ({ commonValues, onFormChange }) => {
  const keyNames = Object.keys(commonValues).slice(1, 8);
  const [lastTarget, setLastTarget] = useState(undefined);

  const groupInputChange = (evt) => {
    setLastTarget(evt.target.name);
    onFormChange(`commonValues.${evt.target.name}`, 'set', evt.target.value);
  };

  const checkboxValueChange = (evt) => {
    setLastTarget(undefined);

    switch (evt.target.value) {
      case 'true':
        return onFormChange(`commonValues.${evt.target.name}`, 'set', false);
      case 'false':
        return onFormChange(`commonValues.${evt.target.name}`, 'set', true);
      default:
        break;
    }
  };

  const extraStopInputChange = (evt, index) => {
    setLastTarget(evt.target.name);
    onFormChange(`commonValues.extraStops.${index}.${evt.target.name}`, 'set', evt.target.value);
  };

  const addExtraStop = (evt) => {
    evt.preventDefault();
    onFormChange(`commonValues.extraStops`, 'push', { ...EXTRA_STOP_DATA_TEMPLATE });
  };

  return (
    <section className={styles.commonValues}>
      <label className={styles.commonLabel}>
        <span className={styles.commonTxt}>Packing</span>
        <select
          className={styles.commonInput}
          name={'packing'}
          value={commonValues.packing}
          onChange={(evt) => onFormChange(`commonValues.${evt.target.name}`, 'set', evt.target.value)}
        >
          <option>No</option>
          <option>Yes</option>
        </select>
      </label>
      {keyNames.map((it) => {
        return(
          <CalculationCommonLabel
            key={nanoid(keyNames.length)}
            title={parseName(it)}
            placeholder={'ex: 3'}
            value={commonValues[it]}
            inputName={it}
            changeValue={groupInputChange}
            isFocused={lastTarget === it}
          />
        );
      })}
      <fieldset className={styles.checkboxContainer}>
        <label className={styles.checkLabel}>
          <span className={styles.commonTxt}>Shuttle</span>
          <input
            className={styles.checkbox}
            type='checkbox'
            name={'shuttle'}
            value={commonValues.shuttle}
            onChange={checkboxValueChange}
            checked={commonValues.shuttle}
          />
        </label>
        <label className={styles.checkLabel}>
          <span className={styles.commonTxt}>Liftgate</span>
          <input
            className={styles.checkbox}
            type='checkbox'
            name={'liftGate'}
            value={commonValues.liftGate}
            onChange={checkboxValueChange}
            checked={commonValues.liftGate}
          />
        </label>
        <label className={styles.checkLabel}>
          <span className={styles.commonTxt}>Hard Floor Covers</span>
          <input
            className={styles.checkbox}
            type='checkbox'
            name={'hardFloorCovers'}
            value={commonValues.hardFloorCovers}
            onChange={checkboxValueChange}
            checked={commonValues.hardFloorCovers}
          />
        </label>
        <label className={styles.checkLabel}>
          <span className={styles.commonTxt}>Film Floor Covers</span>
          <input
            className={styles.checkbox}
            type='checkbox'
            name={'filmFloorCovers'}
            value={commonValues.filmFloorCovers}
            onChange={checkboxValueChange}
            checked={commonValues.filmFloorCovers}
          />
        </label>
      </fieldset>
      <CalculationCommonLabel
        title={parseName(`numOfExtraHeavyItem`)}
        placeholder={'ex: 3'}
        value={commonValues.numOfExtraHeavyItem}
        inputName={`numOfExtraHeavyItem`}
        changeValue={(evt) => {
            setLastTarget(undefined);
            onFormChange(`commonValues.${evt.target.name}`, 'set', evt.target.value)
          }
        }
      />
      <fieldset className={styles.extraStop}>
        <h3 className={styles.extraTitle}>Extra stop:</h3>
        {commonValues.extraStops.length === 0 && <p>Extra stop isn't exist</p>}
        {commonValues.extraStops.length > 0 && commonValues.extraStops.map((extraStop, index) => {
          return (
            <CalculationExtraStop
              key={nanoid(commonValues.extraStops.length)}
              extraStop={extraStop}
              groupInputChange={extraStopInputChange}
              lastTarget={lastTarget}
              index={index}
            />
          );
        })}
        <button
          className={styles.extraBtn}
          onClick={addExtraStop}
        >
          Add extra stop
          <Icon name={IconNames.PLUS} />
        </button>
      </fieldset>
    </section>

  );
}