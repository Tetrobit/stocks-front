import { network } from '../network';
import { getConfigValue } from '@brojs/cli';

class CbrService {
    async getDaily() {
        const response = await network.get('/api/cbr/daily');
        return response.data;
    }

    async getDynamic(date_req1, date_req2, val_id) {
        const response = await network.get('/api/cbr/dynamic', {
            params: {
                date_req1,
                date_req2,
                val_id,
            },
        });
        return response.data;
    }
}

export const cbrService = new CbrService();