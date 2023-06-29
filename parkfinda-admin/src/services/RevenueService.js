import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/revenue';

export function getRevenues() {
	return myhttp.get(apiEndPoint);
}
