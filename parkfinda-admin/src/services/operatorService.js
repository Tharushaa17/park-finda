import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/operator';

export function getOperators() {
	return myhttp.get(apiEndPoint);
}

export function deleteOperator(id) {
	return myhttp.delete(apiEndPoint + '/' + id);
}

export function getOperator(id) {
	return myhttp.get(apiEndPoint + '/' + id);
}

export function saveOperator(operator) {
	if (operator._id) {
		const body = { ...operator };
		delete body._id;
		return myhttp.put(apiEndPoint + '/' + operator._id, body);
	}
	return myhttp.post(apiEndPoint, operator);
}
