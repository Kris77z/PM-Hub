import { PropsWithChildren } from 'react';

export default function CreateLayout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
