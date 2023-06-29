import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/parking-session';

export function getParkings() {
	return myhttp.get(apiEndPoint);
}
