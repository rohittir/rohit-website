import { environment } from '../src/environments/environment';

const PROD_SERVER_CONFIG = {
    host: '',
    port: ''
};

export const SERVER_CONFIG = () => {
    if (environment.production) {
        return PROD_SERVER_CONFIG;
    } else {
        return {
            host: 'http://localhost',
            port: '3000',
        };
    }
};

