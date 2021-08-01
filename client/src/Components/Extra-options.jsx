// Third party libraries
import PropTypes from 'prop-types';
// Components
import { DepartmentLabel } from './Department-label';
import { DepartmentTitle } from './Department-title';

// Styles
import styles from '../styles/ExtraOptions.module.css';

export const ExtraOptions = (props) => {
  const {
    extraOptions,
    changeExtraOptions,
  } = props;

  const setHavyItem = (evt) => {
    changeExtraOptions('extraOptions.havyItem', 'set', evt.target.value);
  };

  const setShuttle = (evt) => {
    changeExtraOptions(`extraOptions.shuttle.${evt.target.name}`, 'set', evt.target.value);
  };

  return(
    <section>
      <DepartmentTitle
        title={'Extra options'}
      />
      <div className={styles.container}>
        <DepartmentLabel
          inputId={'havyItem'}
          placeholder={'ex. 160'}
          title={'Havy item charge'}
          name={'havyItem'}
          value={extraOptions.havyItem}
          changeValue={(evt) => setHavyItem(evt)}
          valueType={'$'}
        />
        <div className={styles.shuttleContainer}>
          <DepartmentLabel
            inputId={'shuttle'}
            placeholder={'ex. 160'}
            title={'Havy item charge'}
            name={'charge'}
            value={extraOptions.shuttle.charge}
            changeValue={(evt) => setShuttle(evt)}
            valueType={'$'}
          />
          <label className={styles.optionsContainer}>
            <p className={styles.radiobtnContainer}>
              <input
                type='radio'
                value='hourly'
                name='period'
                checked={extraOptions.shuttle.period === 'hourly'}
                onChange={(evt) => setShuttle(evt)}
              />
              Hourly<br />
              <input
                type='radio'
                value='daily'
                name='period'
                checked={extraOptions.shuttle.period === 'daily'}
                onChange={(evt) => setShuttle(evt)}
              />
              Daily
            </p>
          </label>
        </div>
      </div>
    </section>
  );
}

ExtraOptions.propTypes = {
  extraOptions: PropTypes.object.isRequired,
  changeExtraOptions: PropTypes.func.isRequired,
}
