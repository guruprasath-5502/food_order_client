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

type MenuItem = {
  name: string;
  price: number;
};

export type Restaurant = {
  status: boolean;
  data: {
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
};
