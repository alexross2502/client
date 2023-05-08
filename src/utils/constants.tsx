export const rating = [1, 2, 3, 4, 5];

export enum statusVariant {
  Canceled = "canceled",
  Confirmed = "confirmed",
  Executed = "executed",
}

export const Validator = {
  name: {
    value: /^[А-я]+$/,
    message: "Только кириллица, без символов",
  },
  minLength(num) {
    return {
      value: num,
      message: `Минимальное количество символов - ${num}`,
    };
  },
  maxLength(num) {
    return {
      value: num,
      message: `Максимальное количество символов - ${num}`,
    };
  },
  password: {
    value: /^[A-z0-9]+$/,
    message: "Только латиница и цифры",
  },
  email: {
    value: /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
    message: "Неверный формат",
  },
};

export enum SORTING_ORDER {
  ASC = "asc",
  DESC = "desc",
}

export enum RESERVATION_SORTED_FIELDS {
  TOWN = "towns",
  CLIENT = "clients",
  MASTER = "masters",
  DAY = "day",
  SIZE = "size",
  END = "end",
  PRICE = "price",
  STATUS = "status",
  IMAGES = "image",
}

export enum CLIENTS_SORTED_FIELDS {
  NAME = "name",
  EMAIL = "email",
}

export enum MASTERS_SORTED_FIELDS {
  NAME = "name",
  TOWN = "towns",
  RATING = "rating",
  ADMIN_APPROVE = "AdminApprove",
}

export enum TOWNS_SORTED_FIELDS {
  NAME = "name",
  TARIFF = "tariff",
}
