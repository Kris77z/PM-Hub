'use client';

import { memo, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Flexbox } from 'react-layout-kit';

import { ExtendedPromptTemplate } from '@/components/prompt-stash/PromptCard';
import PMHubDetailView from '@/components/prompt-stash/PMHubDetailView';
import Breadcrumb from '../Breadcrumb';

// 工具数据 - 与主页保持一致
const mockTemplates: ExtendedPromptTemplate[] = [
  // PRD工具
  {
    id: 'manus',
    name: 'Manus',
    description: 'Manus是一款国产PRD文档与需求协作平台，支持结构化PRD、评审流、版本对比、任务分发与进度跟踪，适合中小团队用一体化文档承载需求到交付的全过程。',
    emoji: '📝',
    category: 'PRD工具',
    tags: ['产品需求', '文档协作', 'PRD', '产品管理'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个专业的产品需求文档专家...',
    iconUrl: '/assets/pm-hub/icons/manus.svg',
    url: 'https://manus.im/invitation/HINJQN1E5BBZPUG',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Gemini是Google的原生多模态大模型，支持文本、图像、音频与视频理解与生成，擅长复杂推理与代码能力，可用于文档撰写、调研、原型草拟与多模态分析。',
    emoji: '🤖',
    category: 'PRD工具',
    tags: ['Google', '多模态', 'AI模型', '文档生成'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个基于 Google Gemini 的产品文档助手...',
    iconUrl: '/assets/pm-hub/icons/google-gemini.svg',
    url: 'https://gemini.google.com/app',
  },
  {
    id: 'ai-studio',
    name: 'AI Studio',
    description: 'Google AI Studio 提供在线 Prompt 设计、测试与密钥管理，便捷调用 Gemini API，支持多模型选择、参数调优与分享原型会话。',
    emoji: '🧪',
    category: 'PRD工具',
    tags: ['Google', 'AI实验', '原型设计', '生成式AI'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个Google AI Studio专家...',
    iconUrl: '/assets/pm-hub/icons/ai-studio.svg',
    url: 'https://aistudio.google.com/prompts/new_chat',
  },
  // Figma工具
  {
    id: 'figma-ai',
    name: 'Figma AI',
    description: 'Figma AI 提供自动布局、组件建议与一键生成变体等智能助理能力，可基于自然语言创建UI草图并优化设计一致性。',
    emoji: '🎨',
    category: 'Figma工具',
    tags: ['设计系统', 'UI/UX', '智能设计', 'Figma'],
    variables: [],
    isFavorited: true,
    prompt: '你是一个专业的Figma AI设计助手...',
    iconUrl: '/assets/pm-hub/icons/figma.svg',
    url: 'https://www.figma.com/',
  },
  {
    id: 'codia-ai',
    name: 'Codia AI',
    description: 'Codia AI 支持将截图/草图精准还原为可编辑Figma图层，自动识别布局、颜色与字体，显著缩短从参考到可编辑设计稿的时间。',
    emoji: '🖼️',
    category: 'Figma工具',
    tags: ['截图转设计', 'OCR', 'AI增强', '设计转换'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个Codia AI设计转换专家...',
    iconUrl: '/assets/pm-hub/icons/codia-ai.png',
    url: 'https://www.figma.com/community/plugin/1329812760871373657/codia-ai-design-screenshot-to-editable-figma-design',
  },
  // 开发工具
  {
    id: 'dify',
    name: 'Dify',
    description: 'Dify 是开源LLM应用平台，内置工作流编排、知识库、检索增强、评测与部署，支持多家模型与自托管，快速搭建智能助手/自动化代理。',
    emoji: '🔧',
    category: '开发工具',
    tags: ['LLM应用', '开发平台', '低代码', 'AI应用'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个Dify开发平台专家...',
    iconUrl: '/assets/pm-hub/icons/dify.svg',
    url: 'https://dify.co.link/',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'OpenAI 提供GPT、DALL·E、Whisper等API能力，覆盖自然语言、图像与语音，多用于对话助手、内容生成、代码补全与数据分析。',
    emoji: '🤖',
    category: '开发工具',
    tags: ['OpenAI', 'GPT', 'API', 'AI模型'],
    variables: [],
    isFavorited: false,
    prompt: '你是一个OpenAI API专家...',
    iconUrl: '/assets/pm-hub/icons/openai.svg',
    url: 'https://chatgpt.com/',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'Cursor 是基于 VS Code 的AI编辑器，提供对话式改码、代码生成与上下文理解，支持多模型与项目级 Agent，显著提升开发效率。',
    emoji: '💻',
    category: '开发工具',
    tags: ['代码编辑器', 'AI编程', '代码助手', '开发工具'],
    variables: [],
    isFavorited: true,
    prompt: '你是一个Cursor编程助手专家...',
    iconUrl: '/assets/pm-hub/icons/cursor.svg',
    url: 'https://cursor.com/',
  }
];

interface ClientProps {
  identifier: string;
  mobile?: boolean;
}

const PMHubDetailClient = memo<ClientProps>(({ identifier }) => {
  const [toolData, setToolData] = useState<ExtendedPromptTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundTemplate = mockTemplates.find(t => t.id === identifier);
    if (foundTemplate) {
      setToolData(foundTemplate);
    } else {
      notFound();
    }
    setIsLoading(false);
  }, [identifier]);

  if (isLoading) {
    return <Flexbox>加载中...</Flexbox>;
  }

  if (!toolData) {
    return notFound();
  }

  const handleStartChat = (selectedTemplate: ExtendedPromptTemplate) => {
    // 打开工具链接
    if (selectedTemplate.url) {
      window.open(selectedTemplate.url, '_blank');
    } else {
      console.log('开始与工具对话:', selectedTemplate.name);
    }
  };

  return (
    <Flexbox gap={16} padding={24} style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Breadcrumb identifier={toolData.name} />
      <PMHubDetailView
        template={toolData}
        onStartChat={handleStartChat}
      />
    </Flexbox>
  );
});

PMHubDetailClient.displayName = 'PMHubDetailClient';

export default PMHubDetailClient;