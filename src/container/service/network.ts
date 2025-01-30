import axios from 'axios';
import { getConfigValue } from '@brojs/cli';

const baseUrl = getConfigValue('tetrobit-stocks.api');

export const network = axios.create({ baseURL: baseUrl });
