'use client';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'antd-style';
import { Toaster } from 'sonner';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
