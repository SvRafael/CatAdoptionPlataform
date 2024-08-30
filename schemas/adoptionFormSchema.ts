import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string() .min(1, { message: 'Email is required' }),
    telephone: z.string().min(1, { message: 'Telephone is required' }),
    more: z.string().min(1, { message: 'Why would you want to adopt this cat is required' }),
    agree: z.literal(true, { message: 'I agree to take care of this cat is required' }),
});
