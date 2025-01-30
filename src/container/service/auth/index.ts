import { network } from '../network';

class AuthService {
    async check(): Promise<boolean> {
        // @todo
        return false;
    }
}

export const authService = new AuthService();