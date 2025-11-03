import Image from "next/image";
import COPA from "../../../../../public/COPA/COPA.png";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

// Set up Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Set up Legend font (assuming it's a local font)
const legend = localFont({
  src: "../../../../../public/FONT/Legend_Bold.otf",
  variable: "--font-legend",
  display: "swap",
});

export default async function ParticipantPage({ params }) {
  const { id: participantId } = params;

  try {
    // --- DATA FETCHING (Unchanged) ---
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SCRIPT_URL}?id=${participantId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    // --- END DATA FETCHING ---

    // --- ERROR HANDLING (Unchanged) ---
    if (data.error) {
      return (
        <div
          className={`min-h-screen bg-gray-900 flex items-center justify-center p-4 ${montserrat.variable}`}
        >
          <div className="bg-black text-white p-6 rounded-lg shadow-md max-w-md w-full font-sans">
            <h2 className="text-xl font-bold mb-4 text-red-500">Error</h2>
            <p className="text-red-400">{data.error}</p>
          </div>
        </div>
      );
    }
    // --- END ERROR HANDLING ---

    // --- MAIN COMPONENT RENDER ---
    return (
      <div
        // Use a dark background for the page to blend with the card
        className={`min-h-screen bg-gray-900 flex items-center justify-center p-4 ${montserrat.variable} ${legend.variable}`}
      >
        {/* Card Container: Black background, max width, full width up to max, no rounding */}
        <div className="bg-black text-white max-w-sm w-full overflow-hidden shadow-xl font-sans">
          {/* Header: Flex layout, padding, bottom border */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div className="text-lg font-bold font-montserrat tracking-wide">
              {/* Uppercase district/cabang */}
              DISTRICT | {data.cabang?.toUpperCase()}
            </div>
            {/* Ensure COPA image has appropriate alt text and size */}
            <Image
              src={COPA}
              alt="COPA Logo"
              width={80} // Adjusted size slightly
              height={32}
              priority // Load header logo quickly
            />
          </div>

          {/* Image and Name Overlay Section */}
          <div className="relative">
            {/* Image Container: Set aspect ratio or height */}
            <div className="w-full h-96 bg-gray-700">
              {" "}
              {/* Adjust height (h-96) as needed */}
              {data.photo ? (
                <img
                  src={data.photo}
                  alt={data.name || "Participant"}
                  // Cover ensures the image fills the container, cropping if necessary
                  // w-full and h-full make it fill the parent div
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 font-montserrat">
                    No image available
                  </span>
                </div>
              )}
            </div>

            {/* Name Overlay: Positioned absolutely at the bottom of the relative parent */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pt-16 pb-4 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h1 className="text-4xl font-extrabold tracking-wider leading-tight font-legend text-center text-white">
                {/* Map name words to uppercase divs for line breaks */}
                {data.name?.split(" ").map((word, index) => (
                  <div key={index}>{word.toUpperCase()}</div>
                ))}
              </h1>
            </div>
          </div>

          {/* Content Below Image: Padding applied here */}
          <div className="p-6 pt-4">
            {/* Sport Category / Competitions Banner: Centered */}
            <div className="text-center mt-[-1rem] mb-6">
              {" "}
              {/* Negative margin to pull it up slightly, adjust as needed */}
              <div className="bg-red-600 text-white py-2 px-4 inline-block">
                <span className="font-medium font-montserrat text-sm uppercase">
                  {/* Join cabang and UNIQUE competition names, ensure uppercase */}
                  {(() => {
                    const competitionNames = data.competitions?.map(comp => comp.competition) || [];
                    const uniqueCompetitionNames = [...new Set(competitionNames)];
                    return [
                      ...uniqueCompetitionNames
                    ]
                      .filter(Boolean)
                      .join(" | ")
                      .toUpperCase();
                  })()}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-5">
              {" "}
              {/* Add space between detail items */}
              {/* Next Match Section */}
              <div>
                <p className="text-xs text-gray-400 font-montserrat mb-1 uppercase tracking-wide">
                  Next Match:
                </p>
                {/* Use the specific format from the image */}
                {data.competitions && data.competitions.length > 0 ? (
                  data.competitions.map((comp, index) => (
                    <p key={index} className="text-lg font-montserrat">
                      {/* Attempt to mimic "18.30 - vs Opponent" format */}
                      {/* This assumes timeLocation might contain opponent info */}
                      {/* You might need to adjust data structure/parsing here */}
                      {comp.timeLocation || "To be announced"}
                    </p>
                  ))
                ) : (
                  <p className="text-lg font-montserrat">To be announced</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // --- CATCH BLOCK (Unchanged) ---
    return (
      <div
        className={`min-h-screen bg-gray-900 flex items-center justify-center p-4 ${montserrat.variable}`}
      >
        <div className="bg-black text-white p-6 rounded-lg shadow-md max-w-md w-full font-sans">
          <h2 className="text-xl font-bold mb-4 text-red-500">Error</h2>
          <p className="text-red-400">
            An error occurred while loading the participant data. Please try
            again later.
          </p>
          <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
        </div>
      </div>
    );
    // --- END CATCH BLOCK ---
  }
}
