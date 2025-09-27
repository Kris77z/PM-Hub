'use client';

import { CopyButton } from '@lobehub/ui';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useTheme } from 'antd-style';
import Link from 'next/link';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

const Breadcrumb = memo<{ identifier: string }>(({ identifier }) => {
  const theme = useTheme();
  
  return (
    <AntdBreadcrumb
      items={[
        {
          title: <Link href={'/'}>AI 工具</Link>,
        },
        {
          title: (
            <Flexbox
              align={'center'}
              gap={6}
              horizontal
              style={{
                color: theme.colorTextSecondary,
              }}
            >
              {identifier}
              {identifier !== '创作' && (
                <CopyButton
                  content={identifier}
                  size={{
                    blockSize: 18,
                    size: 12,
                  }}
                />
              )}
            </Flexbox>
          ),
        },
      ]}
    />
  );
});

Breadcrumb.displayName = 'PMHubBreadcrumb';

export default Breadcrumb;
