"use client";

import { useEffect, useRef, useState } from "react";
import { CldImage } from "next-cloudinary";

export default function EventsGallery({ folder }) {
  const [images, setImages] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  async function loadMore() {
    if (loading) return;
    setLoading(true);

    const res = await fetch(
      `/api/load-images?folder=${folder}&cursor=${cursor || ""}`
    );

    const data = await res.json();

    setImages((prev) => {
      const merged = [...prev, ...data.images];
      return [...new Set(merged)];
    });

    setCursor(data.nextCursor);
    setLoading(false);
  }

  // 🔥 Reset + load first batch on folder change
  useEffect(() => {
    setImages([]);
    setCursor(null);
    loadMore();
  }, [folder]);

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current || !cursor) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { rootMargin: "300px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [cursor]);


  function MasonryImage({ src }) {
    const ref = useRef(null);

    function handleLoad(e) {
      const grid = ref.current?.parentElement;
      const rowHeight = 10;
      const rowGap = 16; // gap-4 = 1rem = 16px

      const height = e.target.getBoundingClientRect().height;
      const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));

      ref.current.style.gridRowEnd = `span ${span}`;
    }

    return (
      <div ref={ref}>
        <CldImage
          src={src}
          width={600}
          height={800}
          alt="Event photo"
          className="rounded-xl w-full h-auto"
          loading="lazy"
          onLoad={handleLoad}
        />
      </div>
    );
  }

  return (
    <>
      <div
        className="
          grid
          grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-4 px-6
          auto-rows-[10px]
        "
      >
        {images.map((img) => (
          <MasonryImage key={img} src={img} />
        ))}

      </div>

      {cursor && (
        <div ref={loaderRef} className="h-16 text-center text-gray-400">
          {loading && "Loading more photos…"}
        </div>
      )}
    </>
  );
}
