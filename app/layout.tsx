// (admin)/layout.tsx

export const metadata = {
  title: 'Admin Page',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
