import myhttp from './httpService';
import { apiUrl } from '../CRUDAppConfigs.json';
import axios from 'axios';

const apiEndPoint = apiUrl + '/company';

export function getCompanys() {
	return myhttp.get(apiEndPoint);
}

export function deleteCompany(id) {
	return myhttp.delete(apiEndPoint + '/' + id);
}

export function getCompany(id) {
	return myhttp.get(apiEndPoint + '/' + id);
}

export function saveCompany(company) {
	console.log(company);
	console.log(company['AddressLineOne']);
	if (company._id) {
		const body = { ...company };
		delete body._id;
		// return myhttp.put(apiEndPoint + '/' + company._id, body);
		return axios({
			method: 'post',
			url: 'https://staging-parkfinda-api.eu-west-2.elasticbeanstalk.com/api/v1/api/v1/auth/register',
			data: {
				company
			}
		  });
	}
	return myhttp.post(apiEndPoint, company);
}
