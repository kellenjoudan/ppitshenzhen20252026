"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const toggleMenu = () => setMenuOpen((prev) => !prev);
	
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
					? "bg-[#8C0000]"
					: "bg-gradient-to-b from-black to-transparent"
			}`}
		>
			{/* Logo */}
			<Link href="/" className="flex items-center">
				<img
					src="/ppitsz_whitelogo.webp"
					alt="Logo"
					className="w-[75px] h-[106px] object-contain"
				/>

				<img
					src="/ppitsz2526_whitelogo.webp"
					alt="Logo"
					className="w-[38px] h-[54px] object-contain"
				/>

				<span className="text-white font-cinzel text-[26px] font-bold ml-4">PPIT SHENZHEN</span>
			</Link>

			{/* Overlay for mobile menu */}
			<div
				className={`fixed top-0 right-0 w-[45%] h-full bg-black/70 z-10 transition-opacity ${
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
				<span
					className={`block w-full h-[3px] bg-white rounded transition-transform origin-center ${
						menuOpen ? "transform translate-y-[11px] rotate-45" : ""
					} `}
				></span>
				<span
					className={`block w-full h-[3px] bg-white rounded transition-opacity ${
						menuOpen ? "opacity-0" : ""
					} `}
				></span>
				<span
					className={`block w-full h-[3px] bg-white rounded transition-transform origin-center ${
						menuOpen ? "transform translate-y-[-11px] -rotate-45" : ""
					} `}
				></span>
			</button>

			{/* Navigation menu */}
			<nav
				className={`md:flex gap-9 ${
					menuOpen
						? "flex flex-col absolute top-[70px] right-0 w-[43%] p-5 text-white shadow-lg z-[999]"
						: "hidden"
				}`}
			>
				<Link
					href="/"
					className="md:text-2xl text-xl hover:text-[#b30000] font-montserrat font-semibold text-white"
				>
					Home
				</Link>
				<Link
					href="/committee"
					className="md:text-2xl text-xl hover:text-[#b30000] font-montserrat font-semibold text-white"
				>
					Committee
				</Link>
				<Link
					href="/events"
					className="md:text-2xl text-xl hover:text-[#b30000] font-montserrat font-semibold text-white"
				>
					Events
				</Link>
				<Link
					href="/faq"
					className="md:text-2xl text-xl hover:text-[#b30000] font-montserrat font-semibold text-white"
				>
					FAQ
				</Link>
			</nav>
		</header>
	);
};

export default Header;
