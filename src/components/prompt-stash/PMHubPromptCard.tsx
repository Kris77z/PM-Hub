import { Icon, Tag } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ClockIcon, StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo, useMemo } from 'react';
import { Flexbox } from 'react-layout-kit';
import urlJoin from 'url-join';
import Image from 'next/image';

import { ExtendedPromptTemplate } from './PromptCard';
import { getToolDoc } from '@/data/toolDocs';

const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      background: ${token.colorBgContainer};
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      height: 100%;

      &:hover {
        border-color: ${token.colorBorder};
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }
    `,
    header: css`
      padding: 20px 20px 16px 20px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
    `,
    avatar: css`
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background: ${token.colorBgElevated};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
    `,
    title: css`
      font-size: 16px;
      font-weight: 600;
      color: ${token.colorText};
      margin: 0;
      line-height: 1.4;
      height: 22px; // 固定标题高度
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
    author: css`
      font-size: 13px;
      color: ${token.colorTextTertiary};
      margin-top: 2px;
      height: 18px; // 固定类型行高度
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
    description: css`
      padding: 16px 20px;
      height: 140px; // 固定描述区域高度
      display: flex;
      flex-direction: column;
    `,
    desc: css`
      font-size: 14px;
      color: ${token.colorTextSecondary};
      line-height: 1.6;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 67.2px; // 固定描述文本高度 (3行 * 22.4px)
      flex: 1;
    `,
    footer: css`
      padding: 12px 20px;
      background: ${token.colorFillQuaternary};
      border-top: 1px solid ${token.colorBorderSecondary};
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    stats: css`
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: ${token.colorTextTertiary};
    `,
    stat: css`
      display: flex;
      align-items: center;
      gap: 4px;
      
      .ant-icon {
        font-size: 16px !important;
      }
    `,
    actions: css`
      display: flex;
      align-items: center;
      gap: 8px;
    `,
    tags: css`
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    `,
  };
});

interface PMHubPromptCardProps {
  template: ExtendedPromptTemplate;
  onClick?: () => void;
}

const PMHubPromptCard = memo<PMHubPromptCardProps>(
  ({ template }) => {
    const { styles, theme } = useStyles();
    const router = useRouter();
    const link = urlJoin('/', template.id);
    const toolDoc = useMemo(() => getToolDoc(template.id), [template.id]);

    const handleClick = () => {
      router.push(link);
    };

    return (
      <div className={styles.container} onClick={handleClick}>
        {/* 头部区域 */}
        <div className={styles.header}>
                  <Flexbox horizontal gap={12} align="flex-start">
                    <div className={styles.avatar}>
                      {template.iconUrl ? (
                        <Image 
                          src={template.iconUrl} 
                          alt={template.name} 
                          width={32} 
                          height={32}
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        template.emoji
                      )}
                    </div>
            <Flexbox flex={1} gap={2}>
              <h3 className={styles.title}>{template.name}</h3>
              <div className={styles.author}>{template.category}</div>
            </Flexbox>
          </Flexbox>
        </div>

        {/* 描述区域 */}
        <div className={styles.description}>
          <p className={styles.desc}>{toolDoc?.description ?? template.description}</p>
          
          {/* 标签 */}
          {template.tags && template.tags.length > 0 && (
            <div className={styles.tags}>
              {template.tags.slice(0, 3).map((tag, index) => (
                <Tag 
                  key={index}
                  style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    background: theme.colorFillTertiary,
                    border: 'none',
                    borderRadius: '4px',
                    color: theme.colorTextSecondary,
                  }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {/* 底部统计区域 */}
        <div className={styles.footer}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <Icon icon={StarIcon} size={16} style={{ width: '16px', height: '16px' }} />
              <span>0</span>
            </div>
            <div className={styles.stat}>
              <Icon icon={ClockIcon} size={16} style={{ width: '16px', height: '16px' }} />
              <span>AI 工具</span>
            </div>
          </div>
          <Tag
            style={{
              fontSize: '11px',
              background: theme.colorPrimaryBg,
              border: `1px solid ${theme.colorPrimaryBorder}`,
              color: theme.colorPrimaryText,
              borderRadius: '6px',
            }}
          >
            {template.category}
          </Tag>
        </div>
      </div>
    );
  },
);

PMHubPromptCard.displayName = 'PMHubPromptCard';

export default PMHubPromptCard;
