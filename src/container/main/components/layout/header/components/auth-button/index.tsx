import * as React from 'react';
import * as VKID from '@vkid/sdk';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { getConfigValue } from '@brojs/cli';

import './style.css';
import { useAppDispatch } from '../../../../../../../store/hooks';
import { auth } from '../../../../../../../store/reducers/auth';

export default function AuthButton() {
  const dispatch = useAppDispatch();
  const [oneTap, setOneTap] = React.useState(null);
  
  const handleClick = () => {
    if (oneTap) {
      oneTap.close();
    }

    VKID.Config.init({
      app: parseInt(getConfigValue('tetrobit-stocks.vkid-app')),
      redirectUrl: getConfigValue('tetrobit-stocks.vkid-redirect-url'),
      responseMode: VKID.ConfigResponseMode.Callback,
      source: VKID.ConfigSource.LOWCODE,
    });

    const floatingOneTap = new VKID.FloatingOneTap();

    floatingOneTap.render({
      appName: 'Tetrobit',
      showAlternativeLogin: true,
      oauthList: [
        VKID.OAuthName.VK,
        VKID.OAuthName.OK,
        VKID.OAuthName.MAIL,
      ],
    });

    floatingOneTap.on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, async (data) => {
      const response = await VKID.Auth.exchangeCode(data.code, data.device_id);
      const authData = {
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      };

      dispatch(auth(authData));

      floatingOneTap.close();
      setOneTap(null);
    });

    floatingOneTap.on(VKID.FloatingOneTapInternalEvents.NOT_AUTHORIZED, (data) => {
      setOneTap(null);
    });

    floatingOneTap.on(VKID.FloatingOneTapInternalEvents.SHOW_FULL_AUTH, (data) => {
      setOneTap(null);
    });

    floatingOneTap.on(VKID.FloatingOneTapInternalEvents.START_AUTHORIZE, (data) => {
      setOneTap(null);
    });

    setOneTap(floatingOneTap);
  }

  return (
    <div className="auth-button-wrapper">
      <IconButton onClick={handleClick} color='primary'><LoginIcon/></IconButton>
    </div>
  );
}