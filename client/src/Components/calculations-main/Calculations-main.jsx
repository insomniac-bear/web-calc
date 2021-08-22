// Third party libraries
import { useRouteMatch } from 'react-router-dom';
// Components
import { AddBtn } from '../add-btn/Add-btn';
import { OutDataMessage } from '../outdata-message/OutData-message';
import { SettingsContainer } from '../settings-container/Settings-container';
import { SettingsTitle } from '../settings-title/Settings-title';

export const CalculationsMain = () => {
  const { url } = useRouteMatch();
  return (
    <SettingsContainer>
      <AddBtn
        name={'calculation'}
        linkUrl={`${url}/add`}
        btnType={'link'}
      />
      <SettingsTitle titleName={'calculations'} />
      <OutDataMessage dataName={'Calculations'} />
    </SettingsContainer>
  );
};
