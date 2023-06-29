import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/season-customer';

export function getSeasonCustomers() {
	return myhttp.get(apiEndPoint);
}

export function deleteSeasonCustomer(id) {
	return myhttp.delete(apiEndPoint + '/' + id);
}

export function getSeasonCustomer(id) {
	return myhttp.get(apiEndPoint + '/' + id);
}

export function saveSeasonCustomer(customer) {
	if (customer._id) {
		const body = { ...customer };
		delete body._id;
		return myhttp.put(apiEndPoint + '/' + customer._id, body);
	}
	return myhttp.post(apiEndPoint, customer);
}
