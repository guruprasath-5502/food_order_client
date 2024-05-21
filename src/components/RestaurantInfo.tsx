import { Restaurant } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Dot } from 'lucide-react';

type Props = { restaurant: Restaurant };

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className='border-sla'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold tracking-tight'>
          {restaurant.data.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.data.city}, {restaurant.data.country}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex'>
        {restaurant.data.cuisines.map((item, index) => (
          <span className='flex'>
            <span>{item}</span>
            {index < restaurant.data.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
