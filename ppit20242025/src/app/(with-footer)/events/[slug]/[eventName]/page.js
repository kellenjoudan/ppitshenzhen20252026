import EventsGallery from "../../EventsGallery";
import EventTabs from "../../EventTabs";
import { EVENTS_BY_YEAR } from "../../../../../lib/events";

export const revalidate = 3600;

export default async function EventPage({ params }) {
  // ✅ KEEP await — this is correct
  const { slug, eventName } = await params;

  const events = EVENTS_BY_YEAR[slug] || [];
  const event = events.find((e) => e.slug === eventName);

  if (!event) {
    return <div className="pt-32 px-6 text-red-500">Event not found</div>;
  }

  return (
    <div className="pt-32 bg-[#7E0C0E]">
      {/* EVENT HEADER — INSTANT */}
      <section className="max-w-6xl mx-3 px-6 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-cinzel mb-2 text-white">
          Event Highlights
        </h1>

        <h2 className="text-xl font-montserrat text-white mb-4">
          {event.title}
        </h2>

        <p className="font-montserrat text-white max-w-3xl mb-4">
          {event.description}
        </p>

        <p className="text-white font-montserrat">
        Download full photos here:{" "}
        <a
          href={event.downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Click here
        </a>

        {eventName === "Shenzhen-Cup" && (
          <>
            {" "} |{" "}
            <a
              href={event.secondDownloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Alternative link
            </a>
          </>
        )}
      </p>
      </section>

      <EventTabs slug={slug} events={events} />

      {/* IMAGES LOAD AFTER PAGE RENDERS */}
      <EventsGallery folder={`events/${slug}/${eventName}`} />
    </div>
  );
}
