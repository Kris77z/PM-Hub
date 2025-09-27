import { PropsWithChildren, memo } from 'react';

const CategoryContainer = memo<PropsWithChildren<{ top?: number }>>(({ children, top = 64 }) => {
  return (
    <aside
      style={{ position: 'sticky', top, paddingBottom: 16, height: `calc(100vh - ${top * 2 + 4}px)`, overflowY: 'auto', flex: 'none', width: 220 }}>
      {children}
    </aside>
  );
});

CategoryContainer.displayName = 'PMHubCategoryContainer';

export default CategoryContainer;
