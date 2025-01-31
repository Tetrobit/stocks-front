import * as React from 'react';
import * as VKID from '@vkid/sdk';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import pkceChallenge from 'pkce-challenge';
import { getConfigValue } from '@brojs/cli';

import './style.css';
import { useAppDispatch } from '../../../../../../../store/hooks';
import { auth } from '../../../../../../../store/reducers/auth';

export default function AuthButton() {
  const dispatch = useAppDispatch();
  const [oneTap, setOneTap] = React.useState(null);
  
  const handleClick = async () => {
    if (oneTap) {
      oneTap.close();
    }

    const { code_challenge, code_verifier } = await pkceChallenge();

    VKID.Config.init({
      app: parseInt(getConfigValue('tetrobit-stocks.vkid-app')),
      redirectUrl: getConfigValue('tetrobit-stocks.vkid-redirect-url'),
      responseMode: VKID.ConfigResponseMode.Callback,
      codeChallenge: code_challenge,
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
      data.code_verifier = code_verifier;
      data.redirect_uri = getConfigValue('tetrobit-stocks.vkid-redirect-url');

      dispatch(auth(data));

      floatingOneTap.close();
      setOneTap(null);
    });

    floatingOneTap.on(VKID.FloatingOneTapInternalEvents.NOT_AUTHORIZED, (..._args) => {
      setOneTap(null);
    });

    floatingOneTap.on(VKID.FloatingOneTapInternalEvents.SHOW_FULL_AUTH, (..._args) => {
      setOneTap(null);
    });

    floatingOneTap.on(VKID.FloatingOneTapInternalEvents.START_AUTHORIZE, (..._args) => {
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