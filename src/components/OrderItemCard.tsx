import { OrderStatus, OrderType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ORDER_STATUS } from '@/config/order-status-config';
import { useUpdateMyRestaurantOrder } from '@/api/RestaurantApi';
import { useEffect, useState } from 'react';

type Props = {
  order: OrderType;
};
const OrderItemCard = ({ order }: Props) => {
  const { isLoading, updateOrderStatus } = useUpdateMyRestaurantOrder();

  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateOrderStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hrs = orderDateTime.getHours();
    const mins = orderDateTime.getMinutes();

    const paddedMinutes = mins < 10 ? `0${mins}` : mins;

    return `${hrs}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='grid md:grid-cols-4 gap-6 justify-between mb-3'>
          <div>
            Customer Name :
            <span className='ml-2 font-normal'>
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address :
            <span className='ml-2 font-normal'>
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time : <span className='ml-2 font-normal'>{getTime()}</span>
          </div>
          <div>
            Total Cost :
            <span className='ml-2 font-normal'>
              Rs {(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          {order.cartItems.map((item) => (
            <span>
              <Badge variant={'outline'} className='"mr-2'>
                {item.quantity}
              </Badge>
              {item.name}
            </span>
          ))}
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='status'>What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id='status'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent position='popper'>
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
