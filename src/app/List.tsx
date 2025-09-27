'use client';

import { Grid } from '@lobehub/ui';
import { Empty } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { ExtendedPromptTemplate } from '@/components/prompt-stash/PromptCard';
import PMHubPromptCard from '@/components/prompt-stash/PMHubPromptCard';

export interface PMHubListProps {
  data?: ExtendedPromptTemplate[];
  rows?: number;
  onItemClick?: (item: ExtendedPromptTemplate) => void;
}

const PMHubList = memo<PMHubListProps>(({ data = [], rows = 3, onItemClick }) => {
  if (data.length === 0)
    return (
      <Center height={640}>
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
          description="暂无工具"
        />
      </Center>
    );
    
  return (
    <Grid rows={rows} width={'100%'}>
      {data.map((item, index) => (
        <PMHubPromptCard
          key={item.id || index}
          template={item}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </Grid>
  );
});

PMHubList.displayName = 'PMHubList';

export default PMHubList;
