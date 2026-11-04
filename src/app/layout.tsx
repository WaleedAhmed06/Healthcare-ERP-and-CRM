import type { Metadata } from 'next';
import { AppProviders } from '@/components/providers/app-providers';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'CareOS — Healthcare ERP', template: '%s | CareOS' },
  description: 'A unified healthcare ERP and CRM demonstration workspace.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
