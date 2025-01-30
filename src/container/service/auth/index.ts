import { network } from '../network';

class AuthService {
    async check(): Promise<boolean> {
        const response = await network.get('/api/auth/check');
        return response.data.response;
    }
    
    async auth(data) {
        const response = await network.post('/api/auth', data);
        return response.data.response;
    }
}

export const authService = new AuthService();