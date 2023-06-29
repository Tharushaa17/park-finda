import { defaultDirection } from "../constants/defaultValues";

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];
    if (order.indexOf(A + "") > order.indexOf(B + "")) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "." + mm + "." + yyyy;
};

export const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes();
};

export const getDirection = () => {
  let direction = defaultDirection;
  if (localStorage.getItem("direction")) {
    const localValue = localStorage.getItem("direction");
    if (localValue === "rtl" || localValue === "ltr") {
      direction = localValue;
    }
  }
  return {
    direction,
    isRtl: direction === "rtl",
  };
};

export const setDirection = (localValue) => {
  let direction = "ltr";
  if (localValue === "rtl" || localValue === "ltr") {
    direction = localValue;
  }
  localStorage.setItem("direction", direction);
};

export const getCarParkRequestPayload = (payload) => {
  let requestBody = {
    CompanyId: payload.addCarPark.companyName,
    CarParkName: payload.addCarPark.carParkName,
    AddressLine1: payload.addCarPark.addressLine1,
    AddressLine2: payload.addCarPark.addressLine2,
    City: payload.addCarPark.city,
    PostCode: payload.addCarPark.postCode,
    Latitude: parseFloat(payload.addCarPark.latitude),
    Longitude: parseFloat(payload.addCarPark.longitude),
    ContactPersonName: payload.addCarPark.contactPersonName,
    ContactNumber: payload.addCarPark.contactNumber,
    Email: payload.addCarPark.email,
    MaxHeight: payload.addCarPark.maxHeight,
    SpaceDescription: payload.addCarPark.spaceDescription,
    AccessPinNumber: payload.addCarPark.accessPinNumber,
    AccessSpaceDescription: payload.addCarPark.accessSpaceDescription,
    Spaces: parseInt(payload.addCarPark.noOfSpaces),
    Photos: payload.addCarPark.photos,
    ParkNow: {
      Status: payload.parkNow.isParkNow,
      Spaces: parseInt(payload.parkNow.noOfSpaces),
    },
    ParkLater: {
      Status: payload.parkLater.isParkNow,
      Spaces: parseInt(payload.parkLater.noOfSpaces),
    },
    Monthly: {
      Status: payload.monthly.isMonthly,
      Tariff: parseInt(payload.monthly.monthlyTariff),
      Spaces: payload.monthly.spaces,
    },
    Commissions: {
      IsComParkNow: payload.commissions.isComParkNow,
      ParkNow: {
        Commission: payload.commissions.parkNow.commission,
        ServiceFee: payload.commissions.parkNow.serviceFee,
        MonthlyFee: payload.commissions.parkNow.monthlyFee,
      },
      IsComParkLater: payload.commissions.isComParkLater,
      ParkLater: {
        Commission: payload.commissions.parkLater.commission,
        ServiceFee: payload.commissions.parkLater.serviceFee,
      },
    },
  };
  if (payload.parkNow.parkings.length > 0) {
    requestBody.ParkNow.Parkings = payload.parkNow.parkings.map((item) => {
      return {
        IsWeek: item.isWeek,
        WeekDays: item.weekDays,
        IsTime: item.isTime,
        Duration: {
          FromHrs: parseInt(item.duration.fromHrs),
          FromMin: parseInt(item.duration.fromMin),
          ToHrs: parseInt(item.duration.toHrs),
          ToMin: parseInt(item.duration.toMin)
        },
        Is24h: item.is24h,
        TariffType: item.tariffType,
        Tariffs: item.tariffs.map((tarifItem) => {
          return {
            TariffId: parseInt(tarifItem.tariffId),
            FromHrs: parseInt(tarifItem.fromHrs),
            FromMin: parseInt(tarifItem.fromMin),
            ToHrs: parseInt(tarifItem.toHrs),
            ToMin: parseInt(tarifItem.toMin),
            TimeType: tarifItem.timeType,
            Tariff: parseFloat(tarifItem.tariff),
            Is24: item.is24h,
          };
        }),
      };
    });
  }
  if (payload.parkLater.parkings.length > 0) {
    requestBody.ParkLater.Parkings = payload.parkLater.parkings.map((item) => {
      return {
        IsWeek: item.isWeek,
        WeekDays: item.weekDays,
        IsTime: item.isTime,
        Is24h: item.is24h,
        TariffType: item.tariffType,
        Duration: {
          FromHrs: parseInt(item.duration.fromHrs),
          FromMin: parseInt(item.duration.fromMin),
          ToHrs: parseInt(item.duration.toHrs),
          ToMin: parseInt(item.duration.toMin)
        },
        Tariffs: item.tariffs.map((tarifItem) => {
          return {
            TariffId: parseInt(tarifItem.tariffId),
            FromHrs: parseInt(tarifItem.fromHrs),
            FromMin: parseInt(tarifItem.fromMin),
            ToHrs: parseInt(tarifItem.toHrs),
            ToMin: parseInt(tarifItem.toMin),
            TimeType: tarifItem.timeType,
            Tariff: parseFloat(tarifItem.tariff),
            Is24: item.is24h,
          };
        }),
        NoOfSpaces: item.noOfSpaces,
      };
    });
  }
  return requestBody;
};
