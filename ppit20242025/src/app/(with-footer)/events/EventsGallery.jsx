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

    setImages((prev) => [
      ...prev,
      ...data.images.filter((img) => !prev.includes(img)), // ✅ dedupe
    ]);

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

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 px-6">
      {images.map((img) => (
        <div key={img} className="break-inside-avoid mb-4">
          <CldImage
            src={img}
            width={600}
            height={800}
            alt="Event photo"
            className="rounded-xl w-full"
            loading="lazy"
          />
        </div>
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
