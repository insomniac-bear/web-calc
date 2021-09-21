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
  baseLoadingHours: 0,
  baseUnloadingHours: 0,
  cubicFt: 0,
  miles: 0,
  driveTime: 0,
  totalSmallBoxes: 0,
  totalMediumBoxes: 0,
  fragileBoxes: 0,
};

export const CalculationCommonValues = ({ commonValues, onFormChange, lastTarget, setLastTarget, restLastTarget }) => {
  const keyNames = Object.keys(commonValues).slice(1, 9);
  const [cratesNumber, setCratesNumber] = useState(0);

  const groupInputChange = (evt) => {
    setLastTarget(evt.target.name);
    onFormChange(`commonValues.${evt.target.name}`, 'set', evt.target.value);
  };

  const checkboxValueChange = (evt) => {
    restLastTarget();

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
    restLastTarget();
    onFormChange(`commonValues.extraStops`, 'push', { ...EXTRA_STOP_DATA_TEMPLATE });
  };

  const removeExtraStop = (evt) => {
    evt.preventDefault();
    restLastTarget();
    onFormChange(`commonValues.extraStops.${commonValues.extraStops.length - 1}`, 'del');
  };

  return (
    <section className={styles.commonValues}>
      <label className={styles.commonLabel}>
        <span>Packing</span>
        <select
          className={styles.commonInput}
          name={'packing'}
          value={commonValues.packing}
          onChange={(evt) => onFormChange(`commonValues.${evt.target.name}`, 'set', evt.target.value)}
        >
          <option>No</option>
          <option>Yes</option>
          <option>Kitchen</option>
          <option>Partial</option>
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
          <span>Shuttle</span>
          <input
            className={styles.checkbox}
            type='checkbox'
            name={'shuttle'}
            value={commonValues.shuttle}
            onChange={checkboxValueChange}
            checked={commonValues.shuttle}
            onFocus={restLastTarget}
          />
        </label>
        <label className={styles.checkLabel}>
          <span>Liftgate</span>
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
          <span>Hard Floor Covers</span>
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
          <span>Film Floor Covers</span>
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
            restLastTarget();
            onFormChange(`commonValues.${evt.target.name}`, 'set', evt.target.value)
          }
        }
      />
      <CalculationCommonLabel
          title={parseName(`packingKitOverride`)}
          placeholder={'ex: 3'}
          value={commonValues.packingKitOverride}
          inputName={`packingKitOverride`}
          changeValue={(evt) => {
            restLastTarget();
            onFormChange(`commonValues.${evt.target.name}`, 'set', evt.target.value)
          }}
      />
      <label className={styles.commonLabel}>
        <span>Number of crates</span>
        <select
            className={styles.commonInput}
            name={'cratesNumber'}
            value={cratesNumber}
            onChange={(evt) => {
              restLastTarget();
              setCratesNumber(evt.target.value);
              const crates = [];
              for (let i = 0; i < evt.target.value; i++) {
                crates.push({[`crateCost${i}`]: 0});
              }
              onFormChange(`commonValues.cratesCosts`, 'set', crates);
            }}
        >
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </label>
        {
          cratesNumber > 0 &&
          commonValues.cratesCosts.map((it, index) =>
            <CalculationCommonLabel
              key={nanoid(commonValues.cratesCosts.length)}
              title={`Crates cost ${index + 1}`}
              placeholder={'ex: 3'}
              value={commonValues.cratesCosts[index][`crateCost${index}`]}
              inputName={`crateCost${index}`}
              changeValue={(evt) => {
                setLastTarget(evt.target.name);
                onFormChange(`commonValues.cratesCosts.${index}.${evt.target.name}`, 'set', evt.target.value)
              }}
              isFocused={lastTarget === `crateCost${index}`}
            />)
        }
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
        {
          commonValues.extraStops.length > 0 && 
          <button
            className={styles.removeExtraBtn}
            onClick={removeExtraStop}
          >
            Delete extra stop
            <Icon name={IconNames.MINUS} />
          </button>
        }
      </fieldset>
    </section>

  );
}