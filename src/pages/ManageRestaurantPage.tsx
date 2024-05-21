import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from '@/api/RestaurantApi';
import OrderItemCard from '@/components/OrderItemCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
  const { isLoading: isCreateRestaurantLoading, createRestaurant } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateRestaurantLoading } =
    useUpdateMyRestaurant();

  const { restaurantOrders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue='orders'>
      <TabsList>
        <TabsTrigger value='orders'>Orders</TabsTrigger>
        <TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value='orders'
        className='space-y-5 bg-gray-50 p-10 rounded-lg'
      >
        <h2 className='text-2xl font-bold'>
          {restaurantOrders?.data.length} active orders
        </h2>
        {restaurantOrders?.data.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value='manage-restaurant'>
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateRestaurantLoading || isUpdateRestaurantLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
