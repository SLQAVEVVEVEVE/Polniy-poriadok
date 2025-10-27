import { Metadata } from 'next';
import { PrivacyContent } from './privacy-content';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | ООО «Стройкомплект»',
  description: 'Политика в отношении обработки персональных данных',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
