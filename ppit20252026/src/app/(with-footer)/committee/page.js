"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "../../Components/Header";

export default function CommitteeCarousel() {
	const [menuOpen, setMenuOpen] = useState(false); // Track the state of the menu

	const toggleMenu = () => {
		setMenuOpen(!menuOpen); // Toggle the menu visibility
	};

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

	// Members for the overlay
	const members = [
		{ id: 1, cardImage: "/CMT_Assets/BPH/Nicholas.webp", department: 0 },
		{ id: 2, cardImage: "/CMT_Assets/BPH/Jocelyn.webp", department: 0 },
		{ id: 3, cardImage: "/CMT_Assets/BPH/Christopher.webp", department: 0 },
		{ id: 4, cardImage: "/CMT_Assets/BPH/Kallista.webp", department: 0 },
		{ id: 5, cardImage: "/CMT_Assets/BPH/Christie.webp", department: 0 },
		{ id: 6, cardImage: "/CMT_Assets/BPH/Richelle.webp", department: 0 },
		{ id: 7, cardImage: "/CMT_Assets/Akad/Celine.webp", department: 1 },
		{ id: 8, cardImage: "/CMT_Assets/Akad/Ernest.webp", department: 1 },
		{ id: 9, cardImage: "/CMT_Assets/Akad/Jeanette.webp", department: 1 },
		{ id: 10, cardImage: "/CMT_Assets/Akad/Nathan.webp", department: 1 },
		{ id: 11, cardImage: "/CMT_Assets/Akad/Christopher.webp", department: 1 },
		{ id: 12, cardImage: "/CMT_Assets/IT/Verdine.webp", department: 2 },
		{ id: 13, cardImage: "/CMT_Assets/IT/Willie.webp", department: 2 },
		{ id: 14, cardImage: "/CMT_Assets/IT/Kellen.webp", department: 2 },
		{ id: 15, cardImage: "/CMT_Assets/IT/Kaylinn.webp", department: 2 },
		{ id: 16, cardImage: "/CMT_Assets/IT/Melvin.webp", department: 2 },
		{ id: 17, cardImage: "/CMT_Assets/Wirus/Edward.webp", department: 3 },
		{ id: 18, cardImage: "/CMT_Assets/Wirus/Dhyfa.webp", department: 3 },
		{ id: 19, cardImage: "/CMT_Assets/Wirus/Cheryn.webp", department: 3 },
		{ id: 20, cardImage: "/CMT_Assets/Wirus/Kesya.webp", department: 3 },
		{ id: 21, cardImage: "/CMT_Assets/Wirus/Carlo.webp", department: 3 },
		{ id: 22, cardImage: "/CMT_Assets/Wirus/Michelle.webp", department: 3 },
		{ id: 23, cardImage: "/CMT_Assets/Wirus/Avicienna.webp", department: 3 },
		{ id: 24, cardImage: "/CMT_Assets/Medpub/Patricia.webp", department: 4 },
		{ id: 25, cardImage: "/CMT_Assets/Medpub/Catherine.webp", department: 4 },
		{ id: 26, cardImage: "/CMT_Assets/Medpub/Carlene.webp", department: 4 },
		{ id: 27, cardImage: "/CMT_Assets/Medpub/Raya.webp", department: 4 },
		{ id: 28, cardImage: "/CMT_Assets/Medpub/Calvin.webp", department: 4 },
		{ id: 29, cardImage: "/CMT_Assets/Medpub/Jessica.webp", department: 4 },
		{ id: 30, cardImage: "/CMT_Assets/Medpub/Bryan.webp", department: 4 },
		{ id: 31, cardImage: "/CMT_Assets/Medpub/Jade.webp", department: 4 },
		{ id: 32, cardImage: "/CMT_Assets/Depol/Felix.webp", department: 5 },
		{ id: 33, cardImage: "/CMT_Assets/Depol/James.webp", department: 5 },
		{ id: 34, cardImage: "/CMT_Assets/Depol/Nadya.webp", department: 5 },
		{ id: 35, cardImage: "/CMT_Assets/Depol/Fidel.webp", department: 5 },
		{ id: 36, cardImage: "/CMT_Assets/Depol/Louie.webp", department: 5 },
		{ id: 37, cardImage: "/CMT_Assets/Depol/Miselle.webp", department: 5 },
		{ id: 38, cardImage: "/CMT_Assets/Depol/Vincent.webp", department: 5 },
		{ id: 39, cardImage: "/CMT_Assets/Sosbud/Felicia.webp", department: 6 },
		{ id: 40, cardImage: "/CMT_Assets/Sosbud/Brian.webp", department: 6 },
		{ id: 41, cardImage: "/CMT_Assets/Sosbud/Jessica.webp", department: 6 },
		{ id: 42, cardImage: "/CMT_Assets/Sosbud/Angelene.webp", department: 6 },
		{ id: 43, cardImage: "/CMT_Assets/Sosbud/Rionaldi.webp", department: 6 },
		{ id: 44, cardImage: "/CMT_Assets/Sosbud/Meagan.webp", department: 6 },
		{ id: 45, cardImage: "/CMT_Assets/Sosbud/Cayleen.webp", department: 6 },
	];

	// Corrected layout configurations
	const departmentLayouts = {
		0: { type: "6" }, // BPH (6 members)
		1: { type: "5" }, // AKAD (5 members)
		2: { type: "5" }, // IT (5 members)
		3: { type: "7" }, // WIRUS (7 members)
		4: { type: "8" }, // MEDPUB (8 members)
		5: { type: "7" }, // DEPOL (7 members)
		6: { type: "7" }, // SOSBUD (7 members)
	};

	// Member card component with responsive design
	function MemberCard({ member }) {
		return (
			<>
				<div className="w-full rounded-lg overflow-hidden hover:scale-105 transform transition-transform duration-300 aspect-[3/4] max-w-[200px]">
					<Image
						src={member.cardImage}
						alt={`Card for Member ${member.id}`}
						width={200}
						height={260}
						className="object-cover"
						objectFit="contain"
					/>
				</div>
			</>
		);
	}

	// Layout component with custom arrangements
	function Layout({ type, members }) {
		switch (type) {
			case "6":
				if (members.length !== 6) return <div>Invalid member count</div>;
				return (
					<div className="grid grid-rows-2 justify-center gap-2 md:gap-6">
						{/* First row: 3 cards */}
						<div className="gap-0 md:gap-4 flex flex-row justify-center">
							<MemberCard member={members[0]} />
							<MemberCard member={members[1]} />
							<MemberCard member={members[2]} />
						</div>
						{/* Second row: 3 cards */}
						<div className=" gap-0 md:gap-4 flex flex-row justify-center">
							<MemberCard member={members[3]} />
							<MemberCard member={members[4]} />
							<MemberCard member={members[5]} />
						</div>
					</div>
				);
			case "5":
				if (members.length !== 5) return <div>Invalid member count</div>;
				return (
					<div className="grid grid-rows-2 justify-center gap-2 md:gap-8">
						{/* First row: 3 cards */}
						<div className="gap-2 md:gap-8 flex flex-row justify-center">
							<MemberCard member={members[0]} />
							<MemberCard member={members[1]} />
							<MemberCard member={members[2]} />
						</div>
						{/* Second row: 2 cards */}
						<div className="px-14 md:px-0 gap-2 md:gap-8 flex flex-row justify-center">
							<MemberCard member={members[3]} />
							<MemberCard member={members[4]} />
						</div>
					</div>
				);

			case "7":
				if (members.length !== 7) return <div>Invalid member count</div>;
				return (
					<div className="grid grid-rows-2 justify-center gap-0 md:gap-4">
						{/* First row: 4 cards */}
						<div className="gap-0 md:gap-8 flex flex-row justify-center">
							<MemberCard member={members[0]} />
							<MemberCard member={members[1]} />
							<MemberCard member={members[2]} />
							<MemberCard member={members[3]} />
						</div>
						{/* Second row: 3 cards */}
						<div className=" px-8 md:px:0 gap-0 md:gap-8 flex flex-row justify-center">
							<MemberCard member={members[4]} />
							<MemberCard member={members[5]} />
							<MemberCard member={members[6]} />
						</div>
					</div>
				);
			case "8":
				if (members.length !== 8) return <div>Invalid member count</div>;
				return (
					<div className="grid grid-rows-2 justify-center gap-4">
						{/* First row: 4 cards */}
						<div className="flex-nowrap gap-1 md:gap-8 flex flex-row justify-center">
							<MemberCard member={members[0]} />
							<MemberCard member={members[1]} />
							<MemberCard member={members[2]} />
							<MemberCard member={members[3]} />
						</div>
						{/* Second row: 4 cards */}
						<div className="flex-nowrap gap-1 md:gap-8 flex flex-row justify-center">
							<MemberCard member={members[4]} />
							<MemberCard member={members[5]} />
							<MemberCard member={members[6]} />
							<MemberCard member={members[7]} />
						</div>
					</div>
				);
			default:
				return (
					<div className="grid grid-cols-3 gap-2 justify-items-center">
						{members.map((member, index) => (
							<div key={index}>
								<MemberCard member={member} />
							</div>
						))}
					</div>
				);
		}
	}

	return (
		<div className="w-full overflow-x-hidden">
			<Header menuOpen={menuOpen} toggleMenu={toggleMenu} />
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
								meet the
							</span>
							<span className="block text-6xl md:text-8xl sm:text-6xl -mt-2 md:-mt-4">
								committee
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
