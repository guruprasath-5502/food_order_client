import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  restaurantName: z.string({
    required_error: 'Restaurant Name is required',
  }),
  city: z.string({
    required_error: 'City is required',
  }),
  country: z.string({
    required_error: 'Country is required',
  }),
  deliveryPrice: z.coerce.number({
    required_error: 'Delivery Price is required',
    invalid_type_error: 'must be a valid number',
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: 'Estimated Delivery Time is required',
    invalid_type_error: 'must be a valid number',
  }),
  cuisines: z.array(z.string()).nonempty({
    message: 'Please select atleast one item',
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, 'is required'),
      price: z.coerce.number().min(1, 'is required'),
    })
  ),
  imageFile: z.instanceof(File, { message: 'image is required' }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { cuisines: [], menuItems: [{ name: '', price: 0 }] },
  });

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append('restaurantName', formDataJson.restaurantName);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append(
      'deliveryPrice',
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      'estimatedDeliveryTime',
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((item, index) => {
      formData.append(`menuItems[${index}][name]`, item.name);
      formData.append(
        `menuItems[${index}][price]`,
        (item.price * 100).toString()
      );
    });
    formData.append('imageFile', formDataJson.imageFile);

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-gray-50 p-10 rounded-lg'
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
