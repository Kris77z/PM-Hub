'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'antd-style';
// import { Button } from '@lobehub/ui';
// import { PlusIcon } from 'lucide-react';
// import { useRouter } from 'next/navigation';

const Header = memo(() => {
  const theme = useTheme();
  // const router = useRouter();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["AI", "Innovation", "Intelligence", "Efficiency", "Excellence"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div 
      className="w-full"
      style={{
        backgroundColor: theme.colorBgContainer,
      }}
    >
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-32 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular">
              <span style={{ color: theme.colorText }}>Build Better Products with</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    style={{ color: theme.colorPrimary }}
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

                    {/* 创作按钮 - 暂时隐藏 */}
                    {/* <div className="mt-8 flex justify-center">
                      <Button
                        icon={<PlusIcon size={18} />}
                        onClick={() => router.push('/pm-hub/create')}
                        size="large"
                        style={{
                          backgroundColor: theme.colorText,
                          color: theme.colorBgContainer,
                          border: `1px solid ${theme.colorText}`,
                        }}
                      >
                        创作
                      </Button>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'PMHubHeader';

export default Header;
