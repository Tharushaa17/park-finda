import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/role';

export function getRoles() {
	return myhttp.get(apiEndPoint);
}

export function getRole(id) {
	return myhttp.get(apiEndPoint + '/' + id);
}

export function saveRole(role) {
	if (role._id) {
		const body = { ...role };
		delete body._id;
		return myhttp.put(apiEndPoint + '/' + role._id, body);
	}
	return myhttp.post(apiEndPoint, role);
}
