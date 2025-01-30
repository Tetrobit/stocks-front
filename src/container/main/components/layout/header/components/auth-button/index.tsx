import * as React from 'react';
import * as VKID from '@vkid/sdk';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { getConfigValue } from '@brojs/cli';

import './style.css';

export default function AuthButton() {
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
      appName: 'VK ID SDK Demo',
      showAlternativeLogin: true,
      oauthList: [
        VKID.OAuthName.VK,
        VKID.OAuthName.OK,
        VKID.OAuthName.MAIL,
      ],
    });

    floatingOneTap.on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, (data) => {
      console.log(data);
      floatingOneTap.close();
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