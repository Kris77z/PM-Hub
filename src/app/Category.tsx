'use client';

import { Icon, Tag } from '@lobehub/ui';
import { FileText, Palette, LayoutPanelTop, Code } from 'lucide-react';
import { memo, useMemo, useState } from 'react';

import CategoryMenu from './CategoryMenu';

// PM.Hub 工具分类数据 - 模仿 LobeHub 的结构
const usePMHubCategory = () => {
  return useMemo(
    () => [
      {
        icon: LayoutPanelTop,
        key: 'all',
        label: '全部工具',
      },
      {
        icon: FileText,
        key: 'prd',
        label: 'PRD 工具',
      },
      {
        icon: Palette,
        key: 'figma',
        label: 'Figma 工具',
      },
      {
        icon: Code,
        key: '开发',
        label: '开发工具',
      },
    ],
    [],
  );
};

interface CategoryProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const Category = memo<CategoryProps>(({ 
  selectedCategory = 'all', 
  onCategoryChange 
}) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const cates = usePMHubCategory();

  // 模拟每个分类的工具数量
  const mockCategoryData = useMemo(() => [
    { category: 'all', count: 8 },
    { category: 'prd', count: 3 },
    { category: 'figma', count: 2 },
    { category: '开发', count: 3 },
  ], []);

  const handleClick = (categoryKey: string) => {
    setActiveCategory(categoryKey);
    onCategoryChange?.(categoryKey);
  };

  const total = useMemo(() => mockCategoryData.find(item => item.category === 'all')?.count || 0, [mockCategoryData]);

  return (
    <CategoryMenu
      items={cates.map((item) => {
        const itemData = mockCategoryData.find((i) => i.category === item.key);
        return {
          extra:
            item.key === 'all'
              ? total > 0 && (
                  <Tag
                    size={'small'}
                    style={{
                      borderRadius: 12,
                      paddingInline: 6,
                    }}
                  >
                    {total}
                  </Tag>
                )
              : itemData && (
                  <Tag
                    size={'small'}
                    style={{
                      borderRadius: 12,
                      paddingInline: 6,
                    }}
                  >
                    {itemData.count}
                  </Tag>
                ),
          ...item,
          icon: <Icon icon={item.icon} size={18} />,
          label: item.label,
        };
      })}
      mode={'inline'}
      onClick={(v) => handleClick(v.key as string)}
      selectedKeys={[activeCategory]}
    />
  );
});

Category.displayName = 'PMHubCategory';

export default Category;
