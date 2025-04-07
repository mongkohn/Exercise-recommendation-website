
import './globals.css';
import { Prompt } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Link from 'next/link';
import { ChevronDown, User2 } from "lucide-react";
import Navbar from './navbar';
import Footer from './footer';

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
          <Navbar/>

          {/* Page content */}
          {children}
        </ThemeProvider>
      </body>
          <Footer/>

    </html>
  );
}
