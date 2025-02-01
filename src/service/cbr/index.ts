import { network } from '../network';
import { getConfigValue } from '@brojs/cli';

class CbrService {
    async getDaily() {
        const response = await network.get('/api/cbr/daily', {
            withCredentials: true,
        });
        return response.data;
    }
}

export const cbrService = new CbrService();