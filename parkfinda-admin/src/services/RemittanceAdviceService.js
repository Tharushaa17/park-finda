import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/remittence';

export function getAdvices() {
	return myhttp.get(apiEndPoint);
}
