"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EventTabs({ slug, events }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 px-6 mb-10 overflow-x-auto">
      {events.map((event) => {
        const active = pathname.endsWith(event.slug);

        return (
          <Link
            key={event.slug}
            href={`/events/${slug}/${event.slug}`}
            className={`px-5 py-2 rounded-full whitespace-nowrap transition font-montserrat font-semibold ${
              active
                ? "bg-gray-200" 
                : "bg-red-500 text-white hover:bg-gray-200 hover:text-black"
            }`}
          >
            {event.title}
          </Link>
        );
      })}
    </div>
  );
}
