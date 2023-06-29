import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  CAR_PARK_DELETE,
  CAR_PARK_EDIT,
  createCarParkSuccess,
  CREATE_CAR_PARK,
  GET_CAR_PARK,
  GET_CAR_PARK_LIST,
} from "../actions";
import http from "../../services/httpService";
import {
  carParkDeleteSuccess,
  carParkEditSuccess,
  getCarParkListSuccess,
  getCarParkSuccess,
} from "./actions";
import { getCarParkRequestPayload } from "../../helpers/Utils";

function* createCarPark({ payload }) {
  const requestBody = getCarParkRequestPayload(payload);
  try {
    const response = yield call(http.post, `/api/admin/carpark`, requestBody);
    if (response) {
      yield put(createCarParkSuccess(response));
      yield call(getCarParkList);
    }
  } catch (error) {
    console.error(error);
  }
}

function* getCarParkList() {
  try {
    const response = yield call(http.get, "/api/admin/carpark");
    if (response) {
      yield put(getCarParkListSuccess(response.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* carParkDelete({ payload }) {
  try {
    const response = yield call(http.delete, `/api/admin/carpark/${payload}`);
    if (response) {
      yield put(carParkDeleteSuccess(response));
      yield call(getCarParkList);
    }
  } catch (error) {
    console.error(error);
  }
}

function* carParkEdit({ payload }) {
  try {
    const requestBody = getCarParkRequestPayload(payload.data);
    const response = yield call(
      http.put,
      `/api/admin/carpark/${payload.id}`,
      requestBody
    );
    if (response) {
      yield put(carParkEditSuccess(response.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getCarPark({ payload }) {
  try {
    const response = yield call(http.get, `/api/admin/carpark/${payload}`);
    if (response) {
      const { data } = response;
      let carPark = {
        addCarPark: {},
        parkNow: {},
        parkLater: {},
        monthly: {},
        commissions: {
          parkNow: {},
          parkLater: {},
        },
      };
      carPark.addCarPark.companyName = data.CompanyId?._id;
      carPark.addCarPark.carParkName = data.CarParkName;
      carPark.addCarPark.addressLine1 = data.AddressLine1;
      carPark.addCarPark.addressLine2 = data.AddressLine2;
      carPark.addCarPark.city = data.City;
      carPark.addCarPark.postCode = data.PostCode;
      carPark.addCarPark.latitude = data.Latitude;
      carPark.addCarPark.longitude = data.Longitude;
      carPark.addCarPark.contactPersonName = data.ContactPersonName;
      carPark.addCarPark.contactNumber = data.ContactNumber;
      carPark.addCarPark.email = data.Email;
      carPark.addCarPark.maxHeight = data.MaxHeight;
      carPark.addCarPark.spaceDescription = data.SpaceDescription;
      carPark.addCarPark.accessPinNumber = data.AccessPinNumber;
      carPark.addCarPark.accessSpaceDescription = data.AccessSpaceDescription;
      carPark.addCarPark.noOfSpaces = data.Spaces;
      carPark.addCarPark.photos = data.Photos;
      carPark.parkNow.isParkNow = data.ParkNow.Status;
      carPark.parkNow.noOfSpaces = data.ParkNow.Spaces;
      carPark.parkLater.isParkNow = data.ParkLater.Status;
      carPark.parkLater.noOfSpaces = data.ParkLater.Spaces;
      carPark.monthly.isMonthly = data.Monthly.Status;
      carPark.monthly.monthlyTariff = data.Monthly.Tariff;
      carPark.monthly.spaces = data.Monthly.Spaces;
      carPark.commissions.isComParkNow = data.Commissions.IsComParkNow;
      carPark.commissions.parkNow.commission =
        data.Commissions.ParkNow.Commission;
      carPark.commissions.parkNow.serviceFee =
        data.Commissions.ParkNow.ServiceFee;
      carPark.commissions.parkNow.monthlyFee =
        data.Commissions.ParkNow.MonthlyFee;
      carPark.commissions.isComParkLater = data.Commissions.IsComParkLater;
      carPark.commissions.parkLater.commission =
        data.Commissions.ParkLater.Commission;
      carPark.commissions.parkLater.serviceFee =
        data.Commissions.ParkLater.ServiceFee;
      carPark.parkNow.parkings = [];
      if (data.ParkNow.Parkings && data.ParkNow.Parkings.length > 0) {
        carPark.parkNow.parkings = data.ParkNow.Parkings.map((item, index) => {
          return {
            parkId: index + 1,
            isWeek: item.IsWeek,
            weekDays: item.WeekDays,
            isTime: item.IsTime,
            is24h: item.Is24h,
            tariffType: item.TariffType,
            duration: {
              fromHrs: item.Duration.FromHrs,
              fromMin: item.Duration.FromMin,
              toHrs: item.Duration.ToHrs,
              toMin: item.Duration.ToMin
            },
            tariffs: item.Tariffs.map((tarifItem) => {
              return {
                tariffId: tarifItem.TariffId,
                fromHrs: tarifItem.FromHrs,
                fromMin: tarifItem.FromMin,
                toHrs: tarifItem.ToHrs,
                toMin: tarifItem.ToMin,
                timeType: tarifItem.TimeType,
                tariff: tarifItem.Tariff,
                is24: item.Is24h,
              };
            }),
          };
        });
      }
      carPark.parkLater.parkings = [];
      if (data.ParkLater.Parkings && data.ParkLater.Parkings.length > 0) {
        carPark.parkLater.parkings = data.ParkLater.Parkings.map(
          (item, index) => {
            return {
              parkId: index + 1,
              isWeek: item.IsWeek,
              weekDays: item.WeekDays,
              isTime: item.IsTime,
              duration: {
                fromHrs: item.Duration.FromHrs,
                fromMin: item.Duration.FromMin,
                toHrs: item.Duration.ToHrs,
                toMin: item.Duration.ToMin
              },
              is24h: item.Is24h,
              tariffType: item.TariffType,
              tariffs: item.Tariffs.map((tarifItem) => {
                return {
                  tariffId: tarifItem.TariffId,
                  fromHrs: tarifItem.FromHrs,
                  fromMin: tarifItem.FromMin,
                  toHrs: tarifItem.ToHrs,
                  toMin: tarifItem.ToMin,
                  timeType: tarifItem.TimeType,
                  tariff: tarifItem.Tariff,
                  is24: item.Is24h,
                };
              }),
            };
          }
        );
      }
      yield put(getCarParkSuccess(carPark));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* watchCreateCarPark() {
  yield takeLatest(CREATE_CAR_PARK, createCarPark);
}

export function* watchGetCarParkList() {
  yield takeLatest(GET_CAR_PARK_LIST, getCarParkList);
}

export function* watchCarParkDelete() {
  yield takeLatest(CAR_PARK_DELETE, carParkDelete);
}

export function* watchCarParkEdit() {
  yield takeLatest(CAR_PARK_EDIT, carParkEdit);
}

export function* watchGetCarPark() {
  yield takeLatest(GET_CAR_PARK, getCarPark);
}

export default function* rootSaga() {
  yield all([
    fork(watchCreateCarPark),
    fork(watchGetCarParkList),
    fork(watchCarParkDelete),
    fork(watchCarParkEdit),
    fork(watchGetCarPark),
  ]);
}
