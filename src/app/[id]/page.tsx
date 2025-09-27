import { notFound } from 'next/navigation';
import PMHubDetailClient from './Client';

interface PageProps {
  params: { id: string };
}

export default async function PMHubDetailPage({ params }: PageProps) {
  const { id } = params;
  
  if (!id) {
    return notFound();
  }

  return <PMHubDetailClient identifier={id}  />;
}

export const generateStaticParams = async () => {
  // 返回空数组，表示在构建时不预生成任何路径
  return [];
};
