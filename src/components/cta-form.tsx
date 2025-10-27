'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';

const PHONE_PLACEHOLDER = '+7 (___) ___-__-__';

export function CtaForm() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      message: '',
      honeypot: '',
      startedAt: Date.now(),
    },
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitSuccessful }, 
    reset 
  } = form;

  const sendTestEmail = async () => {
    // Get current form values
    const formValues = form.getValues();
    
    // Set default values if fields are empty
    const data = {
      name: formValues.name || 'Не указано',
      phone: formValues.phone || 'Не указан',
      email: formValues.email || 'Не указана',
      message: formValues.message || 'Сообщение не заполнено',
      startedAt: formValues.startedAt || Date.now(),
      honeypot: formValues.honeypot || ''
    };
    
    console.log('Sending form data:', data);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        console.error('Test email failed:', response.status, responseData);
        throw new Error(responseData.message || 'Ошибка при отправке тестового письма');
      }

      console.log('Test email sent successfully:', responseData);
      
      toast({
        title: 'Успешно!',
        description: 'Тестовое письмо отправлено.',
      });
      
      return responseData;
    } catch (error) {
      console.error('Test email error:', error);
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Произошла ошибка при отправке тестового письма',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    // This will now just call our test email function
    return await sendTestEmail();
  };

  // Debug form state changes
  useEffect(() => {
    console.log('Form state:', {
      isSubmitting,
      isSubmitSuccessful,
      hasErrors: Object.keys(errors).length > 0,
    });
  }, [isSubmitting, isSubmitSuccessful, errors]);

  return (
    <section id="cta" className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <form onSubmit={async (e) => {
            e.preventDefault();
            await sendTestEmail();
          }} className="grid gap-12 md:grid-cols-2" noValidate>
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Оставьте заявку на бесплатный выезд инженера
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90">
                Наш специалист приедет в удобное для вас время, проведет замеры и рассчитает стоимость работ.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/80">Звоните нам</p>
                    <a href="tel:+74951234567" className="text-lg font-medium hover:underline">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <MailIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/80">Пишите на почту</p>
                    <a href="mailto:info@example.com" className="text-lg font-medium hover:underline">
                      info@example.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Honeypot field */}
              <div className="absolute opacity-0 h-0 w-0 overflow-hidden">
                <input type="text" tabIndex={-1} {...register('honeypot')} />
              </div>
              <input type="hidden" {...register('startedAt')} />

              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Ваше имя *
                </label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/70"
                  {...register('name')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  Телефон *
                </label>
                <Input
                  id="phone"
                  placeholder={PHONE_PLACEHOLDER}
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/70"
                  {...register('phone')}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium">
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/70"
                  placeholder="Опишите ваш вопрос или задачу..."
                  {...register('message')}
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>
                <p className="mt-2 text-xs text-primary-foreground/70">
                  Нажимая на кнопку, вы даете согласие на обработку персональных данных
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
