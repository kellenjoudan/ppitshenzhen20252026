"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Header = ({ menuOpen, toggleMenu }) => {
	const [isScrolled, setIsScrolled] = useState(false);

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
			className={`fixed top-0 w-full flex justify-between items-center p-5 text-xl z-[999] md:px-12 px-8 ${
				isScrolled
					? "bg-white shadow-md"
					: "bg-gradient-to-b from-black to-transparent"
			}`}
		>
			{/* Logo */}
			<Link href="/">
				<img
					src="/images/PPITSZlogoheader.webp"
					alt="Logo"
					className="w-[125px] h-auto object-contain"
				/>
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
				className={`flex flex-col justify-around w-8 h-8 border-none cursor-pointer z-[999] md:hidden ${
					menuOpen ? "active" : ""
				}`}
				aria-label="Toggle navigation"
				onClick={toggleMenu}
			>
				<span
					className={`block w-full h-[3px] rounded transition-transform ${
						menuOpen ? "transform translate-y-[11px] rotate-45" : ""
					} ${isScrolled ? "bg-black" : "bg-white"}`}
				></span>
				<span
					className={`block w-full h-[3px] rounded transition-opacity ${
						menuOpen ? "opacity-0" : ""
					} ${isScrolled ? "bg-black" : "bg-white"}`}
				></span>
				<span
					className={`block w-full h-[3px] rounded transition-transform ${
						menuOpen ? "transform translate-y-[-11px] -rotate-45" : ""
					} ${isScrolled ? "bg-black" : "bg-white"}`}
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
					className={`md:text-2xl text-xl hover:text-[#b30000] font-montserrat font-semibold ${
						isScrolled && !menuOpen ? "text-black" : "text-white"
					}`}
				>
					Home
				</Link>
				<Link
					href="/committee"
					className={`md:text-2xl text-xl hover:text-[#b30000] font-montserrat font-semibold ${
						isScrolled && !menuOpen ? "text-black" : "text-white"
					}`}
				>
					Committee
				</Link>
				<Link
					href="/events"
					className={`md:text-2xl text-xl hover:text-[#b30000] font-montserrat font-semibold ${
						isScrolled && !menuOpen ? "text-black" : "text-white"
					}`}
				>
					Events
				</Link>
				<Link
					href="/faq"
					className={`md:text-2xl text-xl hover:text-[#b30000] font-montserrat font-semibold ${
						isScrolled && !menuOpen ? "text-black" : "text-white"
					}`}
				>
					FAQ
				</Link>
			</nav>
		</header>
	);
};

export default Header;
