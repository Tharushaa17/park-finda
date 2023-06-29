import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';

const apiEndPoint = apiUrl + '/payment-gateway';

export function getPayments() {
	return myhttp.get(apiEndPoint);
}

export function getPayment(id) {
	return myhttp.get(apiEndPoint + '/' + id);
}

export function savePayment(payment) {
	if (payment._id) {
		const body = { ...payment };
		delete body._id;
		return myhttp.put(apiEndPoint + '/' + payment._id, body);
	}
	return myhttp.post(apiEndPoint, payment);
}
