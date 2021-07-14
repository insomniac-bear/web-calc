// Components
import { AddBtn } from './Add-btn';
import { DepatrmentList } from './Department-list';
import { LoadMoreBtn } from './LoadMore-btn';
import { OutDataMessage } from './OutData-message';
import { SettingsContainer } from './Settings-container';
import { SettingsTitle } from './Settings-title';
// Util functions
import { showComponent } from '../util/utils';

export const Departments = ({ data }) => {
  return(
    <SettingsContainer>
      <AddBtn
        name={'department'}
        linkUrl={'/departmentadd'}
      />
      <SettingsTitle titleName={'departments'} />
      {data.length > 0 ? 
        <DepatrmentList departments={data}/> : 
        <OutDataMessage dataName={'Departments'}/>
      }
      {showComponent(data.length > 0, <LoadMoreBtn />)}
    </SettingsContainer>
  );
};