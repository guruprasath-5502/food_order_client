import { useGetMyOrders } from '@/api/OrderApi';
import LoadingSpinner from '@/components/LoadingSpinner';
import noResultsIcon from '../../public/NoResult.svg';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import OrderStatusDetail from '@/components/OrderStatusDetail';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const OrderStatusPage = () => {
  const { isLoading, orders } = useGetMyOrders();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!orders?.status || orders.data.length == 0) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <img src={noResultsIcon} alt='No results found' className='w-32' />
        <span className='text-sm font-semibold'>Oops! No Orders Found</span>
      </div>
    );
  }

  return (
    <div className='space-y-10'>
      {orders.data.map((order) => (
        <div className='space-y-10 bg-gray-50 p-10 rounded-lg'>
          <OrderStatusHeader order={order} />
          <div className='grid gap-10 md:grid-cols-2'>
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className='rounded-md object-cover h-full w-full'
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
