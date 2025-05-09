'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/cart-context';
import { useLanguage } from '@/contexts/language-context';
import { useToast } from '@/hooks/use-toast';
import { CreditCard } from 'lucide-react';

const paymentFormSchema = z.object({
  nameOnCard: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  cardNumber: z.string()
    .min(16, { message: 'Card number must be 16 digits.' })
    .max(16, { message: 'Card number must be 16 digits.' })
    .regex(/^\d{16}$/, { message: 'Card number must be 16 digits.' }),
  expiryDate: z.string()
    .min(5, { message: 'Expiry date must be MM/YY.'})
    .max(5, { message: 'Expiry date must be MM/YY.'})
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Expiry date must be in MM/YY format.' }),
  cvv: z.string()
    .min(3, { message: 'CVV must be 3 or 4 digits.' })
    .max(4, { message: 'CVV must be 3 or 4 digits.' })
    .regex(/^\d{3,4}$/, { message: 'CVV must be 3 or 4 digits.' }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export default function PaymentForm() {
  const { clearCart } = useCart();
  const { translate } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      nameOnCard: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  async function onSubmit(data: PaymentFormValues) {
    // Simulate API call for payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success/failure
    const paymentSuccessful = Math.random() > 0.2; // 80% success rate

    if (paymentSuccessful) {
      toast({
        title: translate('paymentSuccessful'),
        description: translate('yourOrderIsConfirmed') || 'Your order has been confirmed.',
      });
      clearCart();
      router.push('/');
    } else {
      toast({
        title: translate('paymentFailed'),
        description: translate('pleaseCheckDetails') || 'Please check your payment details and try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nameOnCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translate('nameOnCard')}</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translate('cardNumber')}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="•••• •••• •••• ••••" {...field} maxLength={16} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('expiryDate')}</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YY" {...field} maxLength={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('cvv')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="•••" {...field} maxLength={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            translate('processing') || 'Processing...'
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              {translate('payNow')}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
