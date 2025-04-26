// (admin)/layout.tsx

export const metadata = {
    title: 'Admin Page',
  };
  
  export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <div>
            {children}
          </div>
        </body>
      </html>
    );
  }