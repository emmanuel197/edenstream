import { useEffect, useRef } from "react";

export const useCustomScrollbar = (maxThumbWidth = 74) => {
  const containerRef = useRef(null);
  const scrollThumbRef = useRef(null);

  const updateScrollThumb = () => {
    if (!containerRef.current || !scrollThumbRef.current) return;

    const container = containerRef.current;
    const thumb = scrollThumbRef.current;

    // Calculate scroll thumb width based on maxThumbWidth
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const thumbWidth = (container.clientWidth / container.scrollWidth) * maxThumbWidth;
    thumb.style.width = `${thumbWidth}px`;

    // Calculate thumb position
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = scrollWidth;
    const thumbPosition = (scrollLeft / maxScrollLeft) * (maxThumbWidth - thumbWidth);
    thumb.style.transform = `translateX(${thumbPosition}px)`;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollThumb);
    window.addEventListener("resize", updateScrollThumb);
    updateScrollThumb(); // initial update

    return () => {
      container.removeEventListener("scroll", updateScrollThumb);
      window.removeEventListener("resize", updateScrollThumb);
    };
  }, []);

  return { containerRef, scrollThumbRef, updateScrollThumb };
};
