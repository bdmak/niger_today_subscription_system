import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scalable Next.js Dashboard',
  description: 'Built with App Router and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}