import { RefObject, useEffect } from 'react';

export function useInfiniteScroll(
  observerRef: RefObject<Element | null>,
  loadMore: () => void,
  hasMore: boolean,
  isLoading: boolean
) {
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    const node = observerRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [observerRef, loadMore, hasMore, isLoading]);
}
