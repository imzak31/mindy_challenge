const BASE_URL = 'https://mindicador.cl/';

interface Endpoints {
    [key: string]: string;
}

const endpoints: Endpoints = {
    api_base: `${BASE_URL}/api`,
};

const apiRoutes: Endpoints = Object.keys(endpoints).reduce((acc, key) => {
    acc[key] = `${BASE_URL}${endpoints[key]}`;
    return acc;
}, {} as Endpoints);

export default apiRoutes;