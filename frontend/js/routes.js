// TODO: Parametrizar url de desarrollo
// TODO: Definir url de producción
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

const user = '/user';

const create = '/create';

module.exports = {
    createUser: () => `${API_URL}${user}${create}`
};
