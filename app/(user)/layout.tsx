import type React from 'react';
import '@/app/globals.css';
import { Prompt } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

export const metadata = {
  title: 'ERD WebSite',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className='z-50 fixed top-0 left-0 w-full bg-white shadow-md'>
      <Navbar />
      </div>
      <div className={`${prompt.className} pt-16 min-h-screen`}>
        {children}
      </div>
      <Footer />
    </ThemeProvider>
  );
}