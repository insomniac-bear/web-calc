// Components
import { CalculationList } from './Calculation-list';
import { LoadMoreBtn } from './LoadMore-btn';
import { OutDataMessage } from './OutData-message';
import { SettingsContainer } from './Settings-container';
import { SettingsHeader } from './Settings-header';
import { SettingsTitle } from './Settings-title';
// Util functions
import { showComponent } from '../util/utils';

export const Calculations = ({ data }) => {
  return(
    <SettingsContainer>
      <SettingsHeader
        addBtnName={'calculations'}
        searchPlaceholder={'reference number'}
      />
      <SettingsTitle titleName={'calculations'} />
      {data.length > 0 ?
        <CalculationList calculationData={data} /> :
        <OutDataMessage dataName={'Calculations'}/>
      }
      {showComponent(data.length > 0, <LoadMoreBtn />)}
    </SettingsContainer>
  );
};