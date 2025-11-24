import fs from "fs";
import CommitteeCarousel from "./committeecarousel.js";

export default function Page() {
	const files = fs.readdirSync("./public/CMT_Assets/");

	var contentPassed = [
		[], // Nama singkat DIVISI
		[], // Nama panjang DIVISI
		[], // List nama-nama member sesuai urutan divisi di contentPassed[0]
"use client";
import { useState } from "react";
import Image from "next/image";

export default function CommitteeCarousel() {
	const [activeSection, setActiveSection] = useState(0);
	const [showOverlay, setShowOverlay] = useState(false);

	// Sections and images
	const sections = [
		{
			id: 0,
			title: "BPH",
			description: "Badan\nPengurus\nHarian",
			image: "/CMT_Assets/Full/BPH.webp",
		},
		{
			id: 1,
			title: "AKAD",
			description: "Akademis",
			image: "/CMT_Assets/Full/Akad.webp",
		},
		{
			id: 2,
			title: "IT",
			description: "Informasi\nTeknologi",
			image: "/CMT_Assets/Full/IT.webp",
		},
		{
			id: 3,
			title: "WIRUS",
			description: "Wirausaha ",
			image: "/CMT_Assets/Full/Wirus.webp",
		},
		{
			id: 4,
			title: "MEDPUB",
			description: "Media\nPublikasi",
			image: "/CMT_Assets/Full/Medpub.webp",
		},
		{
			id: 5,
			title: "DEPOL",
			description: "Olahraga\nPemuda",
			image: "/CMT_Assets/Full/Depol.webp",
		},
		{
			id: 6,
			title: "SOSBUD",
			description: "Sosial\nBudaya",
			image: "/CMT_Assets/Full/Sosbud.webp",
		},
	];

	for(let folderName of files) {
		const i = folderName.split(" "); // format nama folder = "BPH Badan Pengurus Harian"
		contentPassed[0].push(i[0]); // singkatan
		contentPassed[1].push(i.slice(1).join(" ")); // kpanjangan

		const temp = fs.readdirSync(`./public/CMT_Assets/${folderName}`) // format nama member = "n.png"; n --> urutan [startswith 1]
		contentPassed[2].push(temp)
	}
	// console.log(contentPassed);

	return <CommitteeCarousel input={contentPassed} />;
}
	return (
		<div className="w-full overflow-x-hidden">
			<div className="bg-black text-white font-[500] font-montserrat">
				{/* Banner Section */}
				<div className="relative h-[50vh] xl:h-screen w-full overflow-hidden mb-[2%] ">
					<Image
						src="/CMT_Assets/Full/Banner.webp"
						alt="Banner Background"
						fill
						className="object-cover opacity-70"
						priority
						quality={100}
					/>
					<div className="absolute inset-0 bg-black bg-opacity-20" />
					<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
						<h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
							<span className="block text-4xl md:text-6xl sm:text-4xl -mb-2 md:-mb-4 shadow-md">
								Meet The
							</span>
							<span className="block text-6xl md:text-8xl sm:text-6xl -mt-2 md:-mt-4">
								Committee
							</span>
						</h1>
					</div>
				</div>

				{/* Navigation Buttons */}
				<div className="flex flex-wrap justify-center space-x-5 md:space-x-4 mt-10 xl:mt-0 mb-0 xl:mb-3 md:w-[80%] w-[90%] mx-auto md:px-2 xl:px-0">
					{sections.map((section, index) => (
						<button
							key={section.id}
							onClick={() => setActiveSection(index)}
							className={`px-3 md:px-6 py-1 lg:text-xl md:text-lg sm:text-md text-sm rounded-full font-montserrat lg:pb-[-30px] md:pb-[-20px] pb-[-10px] font-semibold ${
								activeSection === index
									? "bg-black border-white border-[2px]"
									: "bg-black hover:bg-white hover:text-black"
							}`}
						>
							{section.title}
						</button>
					))}
				</div>

				{/* Main Content */}
				<div className="flex xl:flex-row flex-col items-center justify-center xl:px-[8%] lg:pb-16 pb-12 mt-2">
					<div className="relative w-[85vw] h-[38vh] sm:w-[55vw] sm:h-[45vh] md:w-[60vw] md:h-[50vh] lg:h-[65vh] xl:w-[70vw] xl:h-[80vh] overflow-hidden rounded-lg shadow-lg flex items-center justify-center xl:ml-auto xl:mr-0 mx-auto">
						{sections.map((section, index) => (
							<Image
								key={section.id}
								src={section.image}
								alt={`Image for ${section.description}`}
								fill
								className={`object-cover transition-opacity duration-400 ease-in-out ${
									activeSection === index ? "opacity-100" : "opacity-0"
								}`}
								quality={100}
							/>
						))}
					</div>
					<div className="flex flex-col items-center justify-center xl:items-start md:w-[50%] w-[85%] space-y-4">
						<h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-center xl:text-left leading-tight w-full">
							{sections[activeSection].description}
						</h2>
						<button
							onClick={() => setShowOverlay(true)}
							className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-700 hover:scale-110 transition duration-300"
						>
							view members
						</button>
					</div>
				</div>

				{/* Overlay Section */}
				{showOverlay && (
					<div
						className="fixed inset-0 bg-black bg-opacity-80  z-[1000] flex items-center justify-center "
						onClick={() => setShowOverlay(false)}
					>
						<div className="p-2 max-w-5xl w-full mx-auto">
							{departmentLayouts[activeSection] && (
								<Layout
									type={departmentLayouts[activeSection].type}
									members={members
										.filter((member) => member.department === activeSection)
										.sort((a, b) => a.id - b.id)}
								/>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
