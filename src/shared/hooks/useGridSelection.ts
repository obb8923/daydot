import { useRef, useMemo, useCallback } from 'react';

interface GridItemLayout {
  width: number;
  height: number;
  absoluteX?: number;
  absoluteY?: number;
  [key: string]: any; // metadata를 위한 유연한 타입
}

interface UseGridSelectionProps<T> {
  items: T[];
  getItemKey: (item: T) => string;
  extractMetadata: (item: T) => Record<string, any>;
  onItemSelect: (item: T, metadata: Record<string, any>) => void;
}

export const useGridSelection = <T,>({
  items,
  getItemKey,
  extractMetadata,
  onItemSelect,
}: UseGridSelectionProps<T>) => {
  const layoutsRef = useRef(new Map<string, GridItemLayout>());

  const layoutHandlers = useMemo(() => {
    const map = new Map<string, (layout: Omit<GridItemLayout, 'absoluteX' | 'absoluteY'>) => void>();
    
    items.forEach((item) => {
      const key = getItemKey(item);
      map.set(key, (layout) => {
        const metadata = extractMetadata(item);
        layoutsRef.current.set(key, { ...layout, ...metadata } as GridItemLayout);
      });
    });
    
    return map;
  }, [items, getItemKey, extractMetadata]);

  const hitTest = useCallback((x: number, y: number): T | null => {
    const entries = Array.from(layoutsRef.current.entries());
    
    for (const [key, info] of entries) {
      if (info.absoluteX == null || info.absoluteY == null || info.width == null || info.height == null) {
        continue;
      }
      
      const withinX = x >= info.absoluteX && x <= (info.absoluteX + info.width);
      const withinY = y >= info.absoluteY && y <= (info.absoluteY + info.height);
      
      if (withinX && withinY) {
        const item = items.find(i => getItemKey(i) === key);
        return item || null;
      }
    }
    
    return null;
  }, [items, getItemKey]);

  return {
    layoutHandlers,
    hitTest,
  };
};
