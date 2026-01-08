"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const toggleMenu = () => setMenuOpen((prev) => !prev);
	const [eventsOpen, setEventsOpen] = useState(false);

	const EVENTS = [
		{ name: "PPITSZ 2024-2025", slug: "2425" },
		{ name: "PPITSZ 2025-2026", slug: "2526" },
	];
	
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`fixed top-0 w-full h-[78px] flex justify-between items-center p-5 text-xl z-[49] ${
				isScrolled
					? "bg-[#FFFFFF]"
					: "bg-gradient-to-b from-black to-transparent"
			}`}
		>
			{/* Logo */}
			<Link href="/" className="flex items-center">
				{isScrolled ? (
					<>
					<img
						src="/PPITLOGO.webp"
						alt="Logo"
						className="w-[55px] h-[80px] object-contain"
					/>

					<img
						src="/ppitsz2526_redlogo.webp"
						alt="Logo"
						className="w-[57px] h-[64px] object-contain"
					/>

					<span className="text-[#8C0000] font-cinzel text-[26px] font-bold ml-1">PPIT SHENZHEN</span>
					</>
				) : (
					<>
					<img
						src="/ppitsz_whitelogo.webp"
						alt="Logo"
						className="-ml-3 w-[75px] h-[106px] object-contain"
					/>

					<img
						src="/ppitsz2526_whitelogo.webp"
						alt="Logo"
						className="w-[38px] h-[54px] object-contain"
					/>

					<span className="text-white font-cinzel text-[26px] font-bold ml-4">PPIT SHENZHEN</span>
					</>
				)}
			</Link>

			{/* Overlay for mobile menu */}
			<div
				className={`fixed top-0 right-0 w-[45%] h-full bg-white z-10 ${
					menuOpen ? "block" : "hidden"
				}`}
				onClick={toggleMenu}
			></div>

			{/* Hamburger button */}
			<button
				className={`flex flex-col justify-between w-8 h-6 border-none cursor-pointer z-[999] md:hidden ${
					menuOpen ? "active" : ""
				}`}
				aria-label="Toggle navigation"
				onClick={toggleMenu}
			>
				{isScrolled ? (
          		<>
					<span
						className={`block w-full h-[3px] bg-[#8C0000] rounded transition-transform origin-center ${
							menuOpen ? "transform translate-y-[11px] rotate-45" : ""
						} `}
					></span>
					<span
						className={`block w-full h-[3px] bg-[#8C0000] rounded transition-opacity ${
							menuOpen ? "opacity-0" : ""
						} `}
					></span>
					<span
						className={`block w-full h-[3px] rounded bg-[#8C0000] transition-transform origin-center ${
							menuOpen ? "transform translate-y-[-11px] -rotate-45" : ""
						} `}
					></span>
				</>
				) : (
				<>
					<span
						className={`block w-full h-[3px] rounded transition-transform origin-center ${
							menuOpen ? "transform translate-y-[11px] rotate-45 bg-[#8C0000]" : "bg-white"
						} `}
					></span>
					<span
						className={`block w-full h-[3px] bg-white rounded transition-opacity ${
							menuOpen ? "opacity-0" : ""
						} `}
					></span>
					<span
						className={`block w-full h-[3px] rounded transition-transform origin-center ${
							menuOpen ? "transform translate-y-[-11px] -rotate-45 bg-[#8C0000]" : "bg-white"
						} `}
					></span>
				</>
				)}
			</button>

			{/* Navigation menu */}
			<nav
				className={`md:flex gap-10 ${
					menuOpen
						? "flex flex-col absolute top-[70px] right-0 w-[43%] p-5 text-[#8C0000] shadow-lg z-[999]"
						: "hidden"
				}`}
			>
				<Link
					href="/"
					className={`md:text-2xl text-xl hover:text-[#8C0000] font-montserrat font-semibold ${
						isScrolled && !menuOpen
							? "text-[#8C0000]"
							: menuOpen
							? "text-[#8C0000]"
							: "text-white"
					}`}
				>
					Home
				</Link>
				<Link
					href="/committee"
					className={`md:text-2xl text-xl hover:text-[#8C0000] font-montserrat font-semibold ${
						isScrolled && !menuOpen
							? "text-[#8C0000]"
							: menuOpen
							? "text-[#8C0000]"
							: "text-white"
					}`}
				>
					Committee
				</Link>

				{/* EVENTS – DESKTOP (hover) */}
				<div className="hidden md:block group">
				{/* Trigger */}
				<span
					className={`inline-block md:text-2xl text-xl font-montserrat font-semibold cursor-pointer hover:text-[#8C0000] ${
					isScrolled && !menuOpen
						? "text-[#8C0000]"
						: menuOpen
						? "text-[#8C0000]"
						: "text-white"
					}`}
				>
					Events
				</span>

				{/* Hover buffer (ACTIVE but invisible) */}
				<div
					className="
					absolute top-15
					h-10 w-full
					opacity-0
					pointer-events-auto
					"
				/>

				{/* Dropdown */}
				<div
					className="
					absolute top-full
					z-[999]
					bg-white
					shadow-lg
					overflow-hidden
					opacity-0 pointer-events-none
					transition-opacity duration-150 ease-out
					group-hover:opacity-100
					group-hover:pointer-events-auto
					"
				>
					{EVENTS.map((event) => (
					<Link
						key={event.slug}
						href={`/events/${event.slug}/Welcoming-Party`}
						className="block px-4 py-3 text-[#8C0000] text-lg font-montserrat font-semibold hover:bg-gray-200 whitespace-nowrap"
					>
						{event.name}
					</Link>
					))}
				</div>
				</div>

				{/* EVENTS – MOBILE (click) */}
				<div className="md:hidden">
				<button
					onClick={() => setEventsOpen((v) => !v)}
					className="flex items-center justify-between w-full md:text-2xl text-xl font-montserrat font-semibold text-[#8C0000]"
				>
					Events
					<span
					className={`transition-transform ${
						eventsOpen ? "rotate-180" : ""
					}`}
					>
					▼
					</span>
				</button>

				{/* Mobile submenu */}
				<div
					className={`mt-3 pl-4 space-y-2 overflow-hidden transition-all duration-200 ${
					eventsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
					}`}
				>
					{EVENTS.map((event) => (
					<Link
						key={event.slug}
						href={`/events/${event.slug}/Welcoming-Party`}
						className="block text-lg font-montserrat text-[#8C0000]"
						onClick={() => {
						setMenuOpen(false);
						setEventsOpen(false);
						}}
					>
						{event.name}
					</Link>
					))}
				</div>
				</div>


				<Link
					href="/faq"
					className={`md:text-2xl text-xl hover:text-[#8C0000] font-montserrat font-semibold ${
						isScrolled && !menuOpen
							? "text-[#8C0000]"
							: menuOpen
							? "text-[#8C0000]"
							: "text-white"
					}`}
				>
					FAQ
				</Link>
			</nav>
		</header>
	);
};

export default Header;
