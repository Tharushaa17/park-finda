import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/enforcement';

export function getEnforcements() {
	return myhttp.get(apiEndPoint);
}
