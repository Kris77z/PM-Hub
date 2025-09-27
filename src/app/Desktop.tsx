"use client";
import { PropsWithChildren, useMemo } from 'react';
import { Flexbox } from 'react-layout-kit';
import { usePathname } from 'next/navigation';

import Container from './Container';
import Header from './Header';
import CategoryContainer from './CategoryContainer';
import PMHubWithCategory from './PMHubWithCategory';

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isCreatePage = useMemo(() => pathname?.startsWith('/create'), [pathname]);

  return (
    <Container>
      <Flexbox width={'100%'} height={'100%'}>
        {/* 顶部标题区域（创建页隐藏） */}
        {!isCreatePage && <Header />}

        {/* 主要内容区域 */}
        <Flexbox
          flex={1}
          gap={24}
          horizontal
          style={{
            position: 'relative',
            padding: '24px',
          }}
          width={'100%'}
        >
          {/* 左侧分类（创建页隐藏） */}
          {!isCreatePage && (
            <CategoryContainer>
              <PMHubWithCategory />
            </CategoryContainer>
          )}

          {/* 右侧内容区域 */}
          <Flexbox flex={1} gap={16}>
            {children}
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </Container>
  );
};

Layout.displayName = 'DesktopPMHubLayout';

export default Layout;
