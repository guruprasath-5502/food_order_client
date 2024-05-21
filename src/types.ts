export type User = {
  status: boolean;
  data: UserObj;
};

export type UserObj = {
  _id: string;
  email: string;
  auth0Id: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  flgUseStatus: number;
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

type CartItemsArrayType = {
  _id: string;
  menuItemId: string;
  name: string;
  quantity: string;
};

type DeliveryDetailType = {
  email: string;
  name: string;
  addressLine1: string;
  city: string;
};

export type CheckoutSessionRequest = {
  cartItems: CartItemsArrayType[];
  deliveryDetails: DeliveryDetailType;
  restaurantId: string;
};

export type CheckoutResponse = {
  status: boolean;
  data: {
    url: string;
  };
};

export type OrderStatus =
  | 'placed'
  | 'paid'
  | 'inProgress'
  | 'outForDelivery'
  | 'delivered';

export type OrderType = {
  _id: string;
  restaurant: RestaurantObj;
  user: UserObj;
  cartItems: CartItemsArrayType[];
  deliveryDetails: DeliveryDetailType;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

export type Order = {
  status: boolean;
  data: OrderType[];
};

export type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};
