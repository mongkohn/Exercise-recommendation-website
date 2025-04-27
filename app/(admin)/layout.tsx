
import '@/app/globals.css';
import { Prompt } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";


export const metadata = {
  title: 'Admin Page',
};
const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
  
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={prompt.className } bg-white min-h-screen>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}

          {/* Page content */}
          {children}
        </ThemeProvider>
      </body>

    </html>
  );
}
