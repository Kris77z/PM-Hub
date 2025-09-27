'use client';

import { useTheme } from 'antd-style';
import { PropsWithChildren, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

const Container = memo<PropsWithChildren>(({ children }) => {
  const theme = useTheme();

  return (
    <Flexbox
      height={'100vh'}
      style={{
        background: theme.colorBgContainer,
        overflow: 'auto',
        position: 'relative',
      }}
      width={'100%'}
    >
      {children}
    </Flexbox>
  );
});

Container.displayName = 'PMHubContainer';

export default Container;
