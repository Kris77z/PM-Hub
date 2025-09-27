'use client';

import { memo, useState, useMemo, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ExtendedPromptTemplate } from '@/components/prompt-stash/PromptCard';
import { getToolDoc } from '@/data/toolDocs';
import PMHubList from './List';

const createTemplate = (
  id: string,
  data: Omit<ExtendedPromptTemplate, 'id' | 'description'>,
): ExtendedPromptTemplate => {
  const doc = getToolDoc(id);

  return {
    id,
    description: doc?.description ?? data.prompt ?? '',
    ...data,
  };
};

// 工具数据 - 按照三个分类重新组织
const mockTemplates: ExtendedPromptTemplate[] = [
  // PRD工具
  createTemplate('manus', {
    name: 'Manus',
    emoji: '📝',
    category: 'PRD工具',
    tags: ['产品需求', '文档协作', 'PRD', '产品管理'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个专业的产品需求文档专家...',
    iconUrl: '/assets/pm-hub/icons/manus.svg',
    url: 'https://manus.im/invitation/HINJQN1E5BBZPUG',
  }),
  createTemplate('gemini', {
    name: 'Gemini',
    emoji: '🤖',
    category: 'PRD工具',
    tags: ['Google', '多模态', 'AI模型', '文档生成'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个基于 Google Gemini 的产品文档助手...',
    iconUrl: '/assets/pm-hub/icons/google-gemini.svg',
    url: 'https://gemini.google.com/app',
  }),
  createTemplate('ai-studio', {
    name: 'AI Studio',
    emoji: '🧪',
    category: 'PRD工具',
    tags: ['Google', 'AI实验', '原型设计', '生成式AI'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个Google AI Studio专家...',
    iconUrl: '/assets/pm-hub/icons/ai-studio.svg',
    url: 'https://aistudio.google.com/prompts/new_chat',
  }),
  // Figma工具
  createTemplate('figma-ai', {
    name: 'Figma AI',
    emoji: '🎨',
    category: 'Figma工具',
    tags: ['设计系统', 'UI/UX', '智能设计', 'Figma'],
    variables: [],
    isFavorited: true,
    prompt: '你是一个专业的Figma AI设计助手...',
    iconUrl: '/assets/pm-hub/icons/figma.svg',
    url: 'https://www.figma.com/',
  }),
  createTemplate('codia-ai', {
    name: 'Codia AI',
    emoji: '🖼️',
    category: 'Figma工具',
    tags: ['截图转设计', 'OCR', 'AI增强', '设计转换'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个Codia AI设计转换专家...',
    iconUrl: '/assets/pm-hub/icons/codia-ai.png',
    url: 'https://www.figma.com/community/plugin/1329812760871373657/codia-ai-design-screenshot-to-editable-figma-design',
  }),
  // 开发工具
  createTemplate('dify', {
    name: 'Dify',
    emoji: '🔧',
    category: '开发工具',
    tags: ['LLM应用', '开发平台', '低代码', 'AI应用'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个Dify开发平台专家...',
    iconUrl: '/assets/pm-hub/icons/dify.svg',
    url: 'https://dify.co.link/',
  }),
  createTemplate('openai', {
    name: 'OpenAI',
    emoji: '🤖',
    category: '开发工具',
    tags: ['OpenAI', 'GPT', 'API', 'AI模型'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个OpenAI API专家...',
    iconUrl: '/assets/pm-hub/icons/openai.svg',
    url: 'https://chatgpt.com/',
  }),
  createTemplate('cursor', {
    name: 'Cursor',
    emoji: '💻',
    category: '开发工具',
    tags: ['代码编辑器', 'AI编程', '代码助手', '开发工具'],
    variables: [],
    isFavorited: true,
    prompt: '你是一个Cursor编程助手专家...',
    iconUrl: '/assets/pm-hub/icons/cursor.svg',
    url: 'https://cursor.com/',
  }),
];

interface ClientProps {
  mobile?: boolean;
}

const Client = memo<ClientProps>(({ }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 监听分类变化事件
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail);
    };

    window.addEventListener('categoryChange', handleCategoryChange as EventListener);
    
    return () => {
      window.removeEventListener('categoryChange', handleCategoryChange as EventListener);
    };
  }, []);

  // 根据分类筛选数据
  const filteredData = useMemo(() => {
    if (selectedCategory === 'all') {
      return mockTemplates;
    }
    
    return mockTemplates.filter(template => {
      const category = template.category?.toLowerCase() || '';
      return category.includes(selectedCategory.toLowerCase());
    });
  }, [selectedCategory]);

  return (
    <Flexbox gap={32} width={'100%'}>
      <PMHubList data={filteredData} rows={3} />
    </Flexbox>
  );
});

Client.displayName = 'PMHubClient';

export default Client;