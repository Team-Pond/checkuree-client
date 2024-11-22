import { useEffect, useRef } from "react";

export default function InfiniteCheckComp(props: {
  isIndicator?: boolean;
  initialDataLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  height?: string;
  callNextPage: () => void;
}) {
  const {
    isIndicator = true,
    initialDataLoading,
    isFetchingNextPage,
    hasNextPage,
    height = "10px",
    callNextPage,
  } = props;
  const infiniteRef = useRef<HTMLDivElement>(null);

  const isInfinityLoading =
    isIndicator && initialDataLoading && isFetchingNextPage;

  useEffect(() => {
    if (!hasNextPage || !initialDataLoading) return;

    function setStateCallback(entries: IntersectionObserverEntry[]) {
      const initTarget = entries[0] as IntersectionObserverEntry;
      if (initialDataLoading && hasNextPage && initTarget.isIntersecting) {
        callNextPage();
      }
    }

    const observer = new IntersectionObserver(setStateCallback);

    if (infiniteRef.current) {
      observer.observe(infiniteRef.current);
    }
    return () => observer && observer.disconnect();
  }, [callNextPage, initialDataLoading, hasNextPage]);

  return (
    <div
      className="w-full flex items-center"
      ref={infiniteRef}
      style={{
        height,
      }}
    >
      {isInfinityLoading ? <div>...loading</div> : null}
    </div>
  );
}
