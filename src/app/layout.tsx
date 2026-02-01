import type { Metadata } from 'next';
import { Barlow, Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Footer } from '@/components';
import { ThemeProvider } from '@/providers';

const barlow = Barlow({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | filmstock',
    default: 'filmstock',
  },
  description:
    'Filmstock transforms your digital photos with authentic film photography effects. Apply classic film stocks like Kodak Portra, Fuji Velvia, and Cinestill 800T using GPU-accelerated WebGL shaders.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={barlow.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
