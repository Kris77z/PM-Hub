import { Avatar, Button, Collapse, Icon, Tooltip } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ClockIcon, CoinsIcon, TagIcon } from 'lucide-react';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import Image from 'next/image';

import { ExtendedPromptTemplate } from './PromptCard';

const useStyles = createStyles(({ css, token }) => {
  return {
    desc: css`
      color: ${token.colorTextSecondary};
    `,
    time: css`
      font-size: 12px;
      color: ${token.colorTextDescription};
    `,
    statsItem: css`
      color: ${token.colorTextSecondary};
    `,
    header: css`
      border-bottom: 1px solid ${token.colorBorderSecondary};
    `,
    sidebar: css`
      border-left: 1px solid ${token.colorBorderSecondary};
    `,
  };
});

interface PMHubDetailViewProps {
  template: ExtendedPromptTemplate;
  onStartChat: (template: ExtendedPromptTemplate) => void;
}

const PMHubDetailView = memo<PMHubDetailViewProps>(({ template, onStartChat }) => {
  const { styles, theme } = useStyles();

  return (
    <Flexbox gap={0} height={'100%'}>
      {/* Header - 参考 LobeHub Header 组件 */}
      <Flexbox className={styles.header} gap={12} padding={24}>
        <Flexbox align={'flex-start'} gap={16} horizontal width={'100%'}>
          <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {template.iconUrl ? (
              <Image 
                src={template.iconUrl} 
                alt={template.name} 
                width={64} 
                height={64}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <Avatar avatar={template.emoji} background={'transparent'} size={64} />
            )}
          </div>
          <Flexbox
            flex={1}
            gap={4}
            style={{
              overflow: 'hidden',
            }}
          >
            <Flexbox
              align={'center'}
              gap={8}
              horizontal
              justify={'space-between'}
              style={{
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <h1
                style={{ fontSize: 24, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                title={template.name}
              >
                {template.name}
              </h1>
            </Flexbox>
            <p className={styles.desc} style={{ margin: 0 }}>
              {template.description}
            </p>
          </Flexbox>
        </Flexbox>
        
        {/* 工具统计信息 */}
        <Flexbox
          align={'center'}
          gap={24}
          horizontal
          style={{
            color: theme.colorTextSecondary,
          }}
        >
          {template.category && (
            <Tooltip title="分类">
              <Flexbox align={'center'} gap={6} horizontal>
                <Icon icon={TagIcon} />
                {template.category}
              </Flexbox>
            </Tooltip>
          )}
          
          {template.tags && template.tags.length > 0 && (
            <Tooltip title="标签数量">
              <Flexbox align={'center'} gap={6} horizontal>
                <Icon icon={CoinsIcon} />
                {template.tags.length}
              </Flexbox>
            </Tooltip>
          )}
          
          <Tooltip title="AI 助手">
            <Flexbox align={'center'} gap={6} horizontal>
              <Icon icon={ClockIcon} />
              AI 工具
            </Flexbox>
          </Tooltip>
        </Flexbox>
      </Flexbox>

      {/* 主要内容区域 */}
      <Flexbox
        gap={48}
        horizontal
        style={{ height: 'calc(100% - 140px)' }}
      >
        {/* 左侧主要内容 */}
        <Flexbox
          flex={1}
          padding={24}
          style={{
            overflow: 'auto',
          }}
        >
          <Flexbox gap={16}>
            {/* 工具概述 */}
            <Collapse
              defaultActiveKey={['summary']}
              expandIconPosition={'end'}
              items={[
                {
                  children: (
                    <p style={{ margin: 0, color: theme.colorTextSecondary }}>
                      {template.description}
                    </p>
                  ),
                  key: 'summary',
                  label: '你可以使用该工具做什么？',
                },
              ]}
              variant={'outlined'}
            />

            {/* 标签列表 */}
            {template.tags && template.tags.length > 0 && (
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12, display: 'block' }}>
                  相关标签
                </h3>
                <Flexbox gap={8} horizontal style={{ flexWrap: 'wrap' }}>
                  {template.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '4px 12px',
                        background: theme.colorBgContainer,
                        border: `1px solid ${theme.colorBorder}`,
                        borderRadius: 16,
                        fontSize: 12,
                        color: theme.colorTextSecondary,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </Flexbox>
              </div>
            )}
          </Flexbox>
        </Flexbox>

        {/* 右侧操作面板 */}
        <Flexbox
          className={styles.sidebar}
          gap={16}
          padding={24}
          style={{
            minWidth: 280,
            width: 280,
          }}
        >
          {/* 开始对话按钮 */}
          <Button
            onClick={() => onStartChat(template)}
            size="large"
            style={{ 
              width: '100%',
              backgroundColor: theme.colorText,
              color: theme.colorBgContainer,
              border: `1px solid ${theme.colorText}`,
            }}
          >
            开始使用
          </Button>

          {/* 工具信息 */}
          <Flexbox gap={12}>
            <h3 style={{ fontSize: 14, fontWeight: 500 }}>
              工具信息
            </h3>
            <Flexbox gap={8}>
              <Flexbox align={'center'} gap={8} horizontal justify={'space-between'}>
                <p className={styles.statsItem} style={{ fontSize: 12, margin: 0 }}>
                  分类
                </p>
                <p style={{ fontSize: 12, margin: 0 }}>
                  {template.category || '通用'}
                </p>
              </Flexbox>
              <Flexbox align={'center'} gap={8} horizontal justify={'space-between'}>
                <p className={styles.statsItem} style={{ fontSize: 12, margin: 0 }}>
                  标签
                </p>
                <p style={{ fontSize: 12, margin: 0 }}>
                  {template.tags?.length || 0} 个
                </p>
              </Flexbox>
              <Flexbox align={'center'} gap={8} horizontal justify={'space-between'}>
                <p className={styles.statsItem} style={{ fontSize: 12, margin: 0 }}>
                  类型
                </p>
                <p style={{ fontSize: 12, margin: 0 }}>
                  AI 工具
                </p>
              </Flexbox>
            </Flexbox>
          </Flexbox>

        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

PMHubDetailView.displayName = 'PMHubDetailView';

export default PMHubDetailView;