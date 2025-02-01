import { network } from '../network';
import { getConfigValue } from '@brojs/cli';

class AuthService {
    async check() {
        const response = await network.get('/api/auth/check', {
            withCredentials: true,
        });
        return response.data;
    }
    
    async auth(data) {
        const response = await network.post('/api/auth', data, {
            withCredentials: true,
        });
        return response.data.response;
    }

    async logout() {
        return await network.get('/api/auth/logout', {
            withCredentials: true,
        });
    }
}

export const authService = new AuthService();