import Route from '../../services/route';

const rootPath = '/api/v1';

export const animalsRouteApi = new Route(`${rootPath}/animals`);
export const vaccinesRouteApi = new Route(`${rootPath}/vaccines`);
