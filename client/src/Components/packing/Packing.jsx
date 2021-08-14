// Third party libraries
import PropTypes from 'prop-types';
// Components
import { DepartmentLabel } from '../department-label/Department-label';
import { DepartmentTitle } from "../department-title/Department-title";
import { SectionTitle } from '../section-title/Section-title';
// Styles
import styles from './Packing.module.css';

export const Packing = (props) => {
  const { packing, changePackingValue } = props;

  return (
    <section>
      <DepartmentTitle title={'Packing'}/>
      <SectionTitle title={'Packing kits'} />
      <div className={styles.packingContainer}>
        <DepartmentLabel
          inputId={'firstBedroom'}
          name={'firstBedroom'}
          title={'1 Bedroom Packing kit'}
          placeholder={'ex: 199'}
          value={packing.packingKits.firstBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.firstBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'secondBedroom'}
          name={'secondBedroom'}
          title={'2 Bedroom Packing kit'}
          placeholder={'ex: 299'}
          value={packing.packingKits.secondBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.secondBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'thirdBedroom'}
          name={'thirdBedroom'}
          title={'3 Bedroom Packing kit'}
          placeholder={'ex: 399'}
          value={packing.packingKits.thirdBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.thirdBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'fourthBedroom'}
          name={'fourthBedroom'}
          title={'4 Bedroom Packing kit'}
          placeholder={'ex: 499'}
          value={packing.packingKits.fourthBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.fourthBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'fifthBedroom'}
          name={'fifthBedroom'}
          title={'5 Bedroom Packing kit'}
          placeholder={'ex: 599'}
          value={packing.packingKits.fifthBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.fifthBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'sixthBedroom'}
          name={'sixthBedroom'}
          title={'6 Bedroom Packing kit'}
          placeholder={'ex: 699'}
          value={packing.packingKits.sixthBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.sixthBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'seventhBedroom'}
          name={'seventhBedroom'}
          title={'7 Bedroom Packing kit'}
          placeholder={'ex: 799'}
          value={packing.packingKits.seventhBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.seventhBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'eighthBedroom'}
          name={'eighthBedroom'}
          title={'8 Bedroom Packing kit'}
          placeholder={'ex: 899'}
          value={packing.packingKits.eighthBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.eighthBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'ninthBedroom'}
          name={'ninethBedroom'}
          title={'9 Bedroom Packing kit'}
          placeholder={'ex: 999'}
          value={packing.packingKits.ninethBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.ninethBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'tenthBedroom'}
          name={'tenthBedroom'}
          title={'10 Bedroom Packing kit'}
          placeholder={'ex: 1099'}
          value={packing.packingKits.tenthBedroom}
          changeValue={(evt) => changePackingValue(`packing.packingKits.tenthBedroom`, 'set', evt.target.value)}
          valueType={'$'}
        />
      </div>
      <div className={styles.packingWrapper}>
        <DepartmentLabel
          inputId={'kitchen'}
          name={'kitchen'}
          title={'Kitchen Packing kit'}
          placeholder={'ex: 120'}
          value={packing.packingKits.kitchen}
          changeValue={(evt) => changePackingValue(`packing.packingKits.kitchen`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'salesTax'}
          name={'salesTax'}
          title={'Sales Tax on Packing'}
          placeholder={'ex: 9'}
          value={packing.packingKits.salesTax}
          changeValue={(evt) => changePackingValue(`packing.packingKits.salesTax`, 'set', evt.target.value)}
          valueType={'%'}
        />
      </div>
      <SectionTitle title={'Packing Supplies'} />
      <div className={styles.packingContainer}>
        <DepartmentLabel
          inputId={'smallBox'}
          name={'smallBox'}
          title={'Small Box'}
          placeholder={'ex: 3'}
          value={packing.supplies.smallBox}
          changeValue={(evt) => changePackingValue(`packing.supplies.smallBox`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'mediumBox'}
          name={'mediumBox'}
          title={'Medium Box'}
          placeholder={'ex: 4'}
          value={packing.supplies.mediumBox}
          changeValue={(evt) => changePackingValue(`packing.supplies.mediumBox`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'largeBox'}
          name={'largeBox'}
          title={'Large Box'}
          placeholder={'ex: 6'}
          value={packing.supplies.largeBox}
          changeValue={(evt) => changePackingValue(`packing.supplies.largeBox`, 'set', evt.target.value)}
          valueType={'$'}
        />
      </div>
      <div className={styles.packingContainer}>
        <DepartmentLabel
          inputId={'packingPapper'}
          name={'packingPapper'}
          title={'Roll of Packing papper'}
          placeholder={'ex: 20'}
          value={packing.supplies.packingPapper}
          changeValue={(evt) => changePackingValue(`packing.supplies.packingPapper`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'bubbleWrap'}
          name={'bubbleWrap'}
          title={'Roll of Bubble wrap'}
          placeholder={'ex: 20'}
          value={packing.supplies.bubbleWrap}
          changeValue={(evt) => changePackingValue(`packing.supplies.bubbleWrap`, 'set', evt.target.value)}
          valueType={'$'}
        />
      </div>
    </section>
  );
}

Packing.propTypes = {
  packing: PropTypes.object.isRequired,
  changePackingValue: PropTypes.func.isRequired,
}
