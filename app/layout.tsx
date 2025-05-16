// (admin)/layout.tsx

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
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
