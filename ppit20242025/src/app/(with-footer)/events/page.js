"use client";

import Image from "next/image";
import Header from "../../Components/Header";
import styles from "./Events.module.css";
import { useRef, useState, useEffect } from "react";

export default function Home() {
	const slides = [
		{
			src: "/Events_images/image1.webp",
			title: "Internal Bonding",
			description:
				"BPH PPITSZ mengadakan acara internal bonding di Xiaomeisha Beach Shenzhen (小梅沙) untuk menguatkan relasi antara sesama anggota PPITSZ.",
		},
		{
			src: "/Events_images/image2.webp",
			title: "NANTARA",
			description:
				"NANTARA <Night at Nusantara> adalah festival meriah yang dipenuhi barang-barang preloved, pertunjukan bakat yang luar biasa, dan cita rasa asli Indonesia! Selain itu, ada juga permainan tradisional Indonesia dan arena permainan untuk memadukan kesenangan dan nostalgia.",
		},
		{
			src: "/Events_images/image4.webp",
			title: "Company Visit to UBS HongKong",
			description: "PPITSZ kali ini berkolaborasi dengan PPIHK untuk mengadakan Company Visit ke UBS AG di Hong Kong dengan topik Global Market dan Banking. UBS sendiri adalah bank investasi global terbesar di Swiss yang menyediakan layanan keuangan di seluruh dunia, dengan fokus pada wealth management, investment banking, dan asset management.",
		},
		{
			src: "/Events_images/image5.webp",
			title: "Interview with Alumni",
			description: "Acara 'Sesi 1-on-1 dengan Alumni CUHKSZ' memberikan kesempatan bagi mahasiswa untuk berdiskusi langsung dengan alumni dalam waktu 10 menit. Peserta bisa bertanya tentang karir, pengalaman industri, dan kehidupan setelah lulus.",
		},
		{
			src: "/Events_images/image6.webp",
			title: "Valentine's Run",
			description: "Valentine's Run memberikan kesempatan bagi para pemain untuk merayakan Hari Valentine dengan lebih seru serta memenangkan hadiah hingga 1300 RMB melalui permainan minigame seru bersama tim.",
		},
		{
			src: "/Events_images/image7.webp",
			title: "Shenzhen Cup",
			description: "SHENZHEN CUP sukses digelar di CUHK Shenzhen! Mahasiswa Indonesia bertanding di cabang Basket, Badminton, dan Mobile Legends.",
		},
		{
			src: "/Events_images/image8.webp",
			title: "Brain Wars & Seminar Maximize AI",
			description: "Para peserta adu kepintaran lewat games seru dan belajar trik AI dari data scientist Bryan Tjandra. Topik seminar mencakup: Prompt Engineering, AI Checker & Cara Humanize AI, serta RAG (Retrieval Augmented Generation).",
		},
		{
			src: "/Events_images/image9.webp",
			title: "COPA 2025",
			description: '"COPA" atau Competition of PPIT Athletics merupakan kompetisi olahraga terbesar antar pelajar Indonesia di Tiongkok sejak tahun 2019. COPA 2025 dilaksanakan di tiga Region, yakni Region Utara, Region Timur, dan Region Selatan. Acara ini dihadiri oleh 310 peserta dari 11 Cabang di Region Selatan. Cabang olahraga yang dipertandingkan mencakup: Basket, Badminton, Modern Dance dan Esports (Mobile Legends).',
		},
	];
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const [isMobile, setIsMobile] = useState(false); // State for checking mobile screen

	useEffect(() => {
		// This code will run after the component has mounted, on the client side
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile(); // Check the screen size initially
		window.addEventListener("resize", checkMobile); // Listen for window resize events

		// Clean up the event listener on component unmount
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className={styles.container}>
			<Header />
			<main className={styles.hero}>
				
				{/* Left Panel */}
				<div
					className={`${styles.leftPanel} ${
						isMobile ? styles.mobileLeftPanel : ""
					}`}
				>
					<div className={styles.textContainer}>
						<h3 style={{ color: "#b30000" }}>OUR EVENTS</h3>
						<h1>{slides[currentSlide].title}</h1>
						<p>{slides[currentSlide].description}</p>
					</div>
				</div>

				<button className={styles.prev} onClick={prevSlide}>
					&#8249;
				</button>

				{/* Right Panel (Carousel) */}
				<div className={styles.rightPanel}>
					<div className={styles.slides}>
						{slides.map((slide, index) => (
							<div
								key={index}
								className={`${styles.slide} ${
									index === currentSlide ? styles.active : ""
								}`}
							>
								<Image
									src={slide.src}
									alt={`Slide ${index + 1}`}
									fill
									style={{ objectFit: "cover" }}
									priority
									quality={100}
								/>
							</div>
						))}
					</div>
					<button className={styles.next} onClick={nextSlide}>
						&#8250;
					</button>
				</div>

				<div className={styles.dots}>
					{slides.map((_, index) => (
						<span
							key={index}
							className={`${styles.dot} ${
								index === currentSlide ? styles.active : ""
							}`}
							onClick={() => setCurrentSlide(index)}
						></span>
					))}
				</div>
			</main>
		</div>
	);
}
