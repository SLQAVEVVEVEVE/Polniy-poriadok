import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(80, 'Имя не должно превышать 80 символов'),
  phone: z.string().min(7, 'Телефон должен содержать минимум 7 цифр').max(30, 'Телефон слишком длинный'),
  email: z.string().email('Введите корректный email').optional(),
  message: z.string().max(1000, 'Сообщение не должно превышать 1000 символов').optional(),
  honeypot: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: 'Необходимо принять условия соглашения',
  }),
  startedAt: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
