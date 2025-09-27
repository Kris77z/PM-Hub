'use client';

import { useState, createContext, useContext } from 'react';
import Category from './Category';

// 创建上下文来共享分类状态
interface CategoryContextType {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within CategoryProvider');
  }
  return context;
};

const PMHubWithCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // 通过事件传递给 Client 组件
    window.dispatchEvent(new CustomEvent('categoryChange', { detail: category }));
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, onCategoryChange: handleCategoryChange }}>
      <Category 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
    </CategoryContext.Provider>
  );
};

export default PMHubWithCategory;
