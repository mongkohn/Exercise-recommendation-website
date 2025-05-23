// (admin)/layout.tsx
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'ERD WebSite',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <AuthProvider>
          <div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
