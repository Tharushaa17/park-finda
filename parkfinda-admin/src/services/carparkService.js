import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/carpark';

export function getCarparks() {
	return myhttp.get(apiEndPoint);
}

export function deleteCarpark(id) {
	return myhttp.delete(apiEndPoint + '/' + id);
}

export function getCarpark(id) {
	return myhttp.get(apiEndPoint + '/' + id);
}

export function saveCarpark(carpark) {
	if (carpark._id) {
		const body = { ...carpark };
		delete body._id;
		return myhttp.put(apiEndPoint + '/' + carpark._id, body);
	}
	return myhttp.post(apiEndPoint, carpark);
}
