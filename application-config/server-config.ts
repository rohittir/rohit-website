import { environment } from '../src/environments/environment';

const PROD_SERVER_CONFIG = {
    host: '',
    port: '',
    isLocalFilesDataRead: true
};

export const SERVER_CONFIG = () => {
    if (environment.production) {
        return PROD_SERVER_CONFIG;
    } else {
        return {
            ...PROD_SERVER_CONFIG,
            host: 'http://localhost',
            port: '3000',
        };
    }
};

