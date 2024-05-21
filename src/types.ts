export type User = {
  status: boolean;
  data: {
    _id: string;
    email: string;
    auth0Id: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
    flgUseStatus: number;
  };
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  status: boolean;
  data: RestaurantObj;
};

export type RestaurantObj = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
  flgUseStatus: number;
};

export type RestaurantSearchResponse = {
  status: boolean;
  data: {
    data: RestaurantObj[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };
};
