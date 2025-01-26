

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Alert from '@mui/material/Alert';
import './style.css';
import CheckIcon from '@mui/icons-material/Check';
import { getExRate } from '../../api';
import { COUNTRIES_ICONS } from '../../constants/countries';
import { CURRENCIES } from '../../constants/currencies';


// index.tsx

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Snackbar } from '@mui/material';

const TopUpPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
    </div>
  );
};
  export default TopUpPage;