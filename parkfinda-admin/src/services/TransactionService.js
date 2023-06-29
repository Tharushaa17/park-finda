import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/transaction';

export function getTransactions() {
	return myhttp.get(apiEndPoint);
}
