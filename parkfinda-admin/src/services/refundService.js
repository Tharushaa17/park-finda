import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/refund';

export function getRefunds() {
	return myhttp.get(apiEndPoint);
}
