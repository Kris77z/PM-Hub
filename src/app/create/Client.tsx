"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "antd-style";
import { Flexbox } from "react-layout-kit";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Breadcrumb from '../Breadcrumb';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "工具名称至少需要2个字符",
  }).max(50, {
    message: "工具名称不能超过50个字符",
  }),
  description: z.string().min(10, {
    message: "工具描述至少需要10个字符",
  }).max(200, {
    message: "工具描述不能超过200个字符",
  }),
  category: z.string().min(1, {
    message: "请选择工具分类",
  }),
  emoji: z.string().min(1, {
    message: "请选择工具图标",
  }),
  tags: z.string().optional(),
  prompt: z.string().min(20, {
    message: "提示词至少需要20个字符",
  }),
});

const CreateToolClient = () => {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('🔧');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      emoji: "🔧",
      tags: "",
      prompt: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      toast("工具创建成功！", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">{JSON.stringify({
              ...data,
              tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
            }, null, 2)}</code>
          </pre>
        ),
      });
      setLoading(false);
      router.push('/');
    }, 1000);
  }

  const handleBack = () => {
    router.back();
  };


  return (
    <Flexbox
      gap={16}
      padding={24}
      style={{ minHeight: 'calc(100vh - 120px)' }}
    >
      <div className="w-full max-w-2xl mx-auto">
        {/* 面包屑导航 */}
        <Breadcrumb identifier="创作" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-6">
          {/* 工具图标 */}
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工具图标</FormLabel>
                <Select onValueChange={(value) => {
                  setSelectedEmoji(value);
                  field.onChange(value);
                }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{selectedEmoji}</span>
                        <SelectValue placeholder="选择图标" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-64">
                    {/* 常用工具图标 */}
                    <SelectItem value="🔧">🔧</SelectItem>
                    <SelectItem value="📝">📝</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 工具名称 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工具名称</FormLabel>
                <FormControl>
                  <Input placeholder="请输入工具名称，如：PRD 文档撰写助手" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 工具描述 */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工具描述</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="请简要描述工具的功能和用途"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 工具分类 */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工具分类</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择工具分类" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="prd">PRD工具</SelectItem>
                    <SelectItem value="figma">Figma工具</SelectItem>
                    <SelectItem value="general">通用工具</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 工具标签 */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工具标签</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="输入标签，用逗号分隔，如：产品,需求,文档" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 工具提示词 */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工具提示词</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="请输入详细的提示词，描述 AI 助手应该如何行为..."
                    className="resize-none"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 提交按钮 */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              style={{
                backgroundColor: theme.colorText,
                color: theme.colorBgContainer,
                border: `1px solid ${theme.colorText}`,
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  创建中...
                </>
              ) : (
                "创建工具"
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleBack}
              disabled={loading}
            >
              取消
            </Button>
          </div>
          </form>
        </Form>
      </div>
    </Flexbox>
  );
};

export default CreateToolClient;