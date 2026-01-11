"use client";
import Image from "next/image";
import PPIT from "../../../public/Home/foto bareng.webp";
import PPITTablet from "../../../public/Home/foto bareng.webp";
import PPITMobile from "../../../public/Home/foto bareng.webp";
import AboutImage from "../../../public/Home/3D_Logo.webp";
import Vision from "../../../public/Home/vision.webp";
import Mission from "../../../public/Home/mission.webp";
import BestSeller from "../../../public/Home/merch.webp";
import SweaterImage from "../../../public/Home/sweater.webp";
import StarShirt from "../../../public/Home/star-shirt.webp";
import ShenzhenShirt from "../../../public/Home/shenzhen-shirt.webp";
import Cap from "../../../public/Home/cap.webp";
import Link from "next/link";

export default function Home() {

	const merchandise = [
		{ name: "Sweater", price: "110元", image: SweaterImage },
		{ name: "Star Shirt", price: "75元", image: StarShirt },
		{ name: "Shenzhen Shirt", price: "75元", image: ShenzhenShirt },
		{ name: "Cap", price: "50元", image: Cap },
	];

	const universities = [
		{
			name: "Peking University Shenzhen Graduate School", 
			ranking: "#14 QS World Rankings 2026",
			color: "#F00000"
		},
		{
			name: "Tsinghua Shenzhen International Graduate School",
			ranking: "#17 QS World Rankings 2026",
			color: "#F8650C"
		},
		{
			name: "The Chinese University of Hong Kong, Shenzhen",
			ranking: "#32 QS World Rankings 2026",
			color: "#FFC917"
		},
		{
			name: "Harbin Institute of Technology Shenzhen",
			ranking: "#256 QS World Rankings 2026",
			color: "#FFC917"
		},
		{
			name: "Southern University of Science and Technology",
			ranking: "#343 QS World Rankings 2026",
			color: "#F8650C"
		},
		{
			name: "Shenzhen University",
			ranking: "#452 QS World Rankings 2026",
			color: "#F00000"
		},
	];

	return (
		<>
			{/* Hero Section */}
			<div className="relative font-montserrat">
				<div className="relative md:h-[100vh] h-[90vh] overflow-hidden">
					<Image
						src={PPITMobile}
						alt="PPIT Hero"
						className="sm:hidden block w-full h-full object-cover"
						priority
						quality={90}
					/>
					<Image
						src={PPIT}
						alt="PPIT Hero"
						className="lg:block hidden w-full h-full object-cover"
						priority
						quality={100}
					/>
					<Image
						src={PPITTablet}
						alt="PPIT Hero"
						className="lg:hidden sm:block hidden w-full h-full object-cover "
						quality={75}
					/>

					<div className="absolute inset-x-0 bottom-0 flex flex-col items-center  md:mb-[-10px]">
						<Link
							href="#about-us"
							className="text-white text-4xl font-light tracking-wider mb-6 drop-shadow-lg"
						>
							find out more
						</Link>
						<Link
							href="#about-us"
							className="animate-bounce mb-8 drop-shadow-lg !smooth-scroll"
						>
							<svg
								width="64"
								height="64"
								viewBox="0 0 24 24"
								fill="none"
								className="text-white"
							>
								<path
									d="M7 10L12 15L17 10"
									stroke="currentColor"
									strokeWidth="3.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</div>
					{/* Red wave transition */}
					<div className="absolute bottom-0 left-0 w-full h-[80px] pointer-events-none">
					{/* Batik left */}
					<div className="absolute inset-y-0 left-0 w-[230px] bg-[url('/Home/BATIK.webp')] bg-repeat-y opacity-30 -left-20 sm:left-0" />

					{/* Batik right (mirrored) */}
					<div className="absolute inset-y-0 right-0 w-[230px] scale-x-[-1] bg-[url('/Home/BATIK.webp')] bg-repeat-y opacity-30 -right-20 sm:right-0" />

					{/* Wave */}
					<svg
						viewBox="0 0 1440 320"
						preserveAspectRatio="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute bottom-0 left-0 w-full h-full"
					>
						{/* wavy top edge + red fill below */}
						<path
						d="
							M0,215
							C160,235 260,255 380,240
							C520,220 620,170 760,155
							C900,140 1080,175 1220,200
							C1320,215 1380,220 1440,215
							L1440,320
							L0,320
							Z
						"
						fill="#7E0C0E"
						/>
					</svg>
					</div>
				</div>
			</div>


			{/* About Section */}
			<section
				id="about-us"
				className="relative py-20 md:px-12 px-8 lg:px-8 w-full mx-auto bg-[#7E0C0E]"
			>
			{/* Left repeating background */}
			<div
				className="absolute inset-y-0 bg-[url('/Home/BATIK.webp')] bg-repeat-y z-0 -left-20 sm:left-0"
				style={{ width: "230px" }}
			/>

			{/* Right repeating background */}
			<div
				className="absolute inset-y-0 scale-x-[-1] bg-[url('/Home/BATIK.webp')] bg-repeat-y z-0 -right-20 sm:right-0"
				style={{ width: "230px" }}
			/>
			{/* Center */}
				<div className="relative z-10 max-w-[90rem] mx-auto md:px-12 px-8 lg:px-8 text-white">
					<div className="flex items-center justify-center lg:block">
						<hr className="w-[20%] md:w-[10%] my-4 border-t-[3px] border-white" />
					</div>

					<h2 className="text-center lg:text-left sm:text-4xl text-3xl font-bold mb-4 text-white font-montserrat">
						ABOUT US
					</h2>
					<div className="grid grid-row-4 md:grid-cols-8 md:grid-rows-1 gap-8">
						<div className="row-start-2 md:row-start-1 md:col-span-5 lg:col-span-6">
							<div className="text-2xl md:text-xl lg:text-3xl font-[530] text-center md:text-left font-montserrat">
								Keinginan pelajar-pelajar Indonesia di Kota Shenzhen untuk berdiri
								mandiri sebagai sebuah organisasi bermula pada tahun 2018.
							</div>
							<div className="text-lg md:text-base lg:text-xl mt-4 font-montserrat">
								Di tahun yang sama, Perhimpunan Pelajar Indonesia di Tiongkok
								ranting Shenzhen (PPITSZ) resmi berdiri sebagai ranting dari
								cabang Guangzhou. Kepengurusan pertama PPITSZ dipimpin oleh
								Saudara Ivan Prawira Limanauwyang juga merupakan salah satu
								inisiator berdirinya organisasi ini. Setelah melewati satu periode
								kepengerusan, PPITSZ akhirnya disahkan sebagai cabang pada tahun
								2019. Saat ini, PPITSZ menaungi lebih dari 500 pelajar aktif yang
								tersebar di 4 lembaga pendidikan di Kota Shenzhen.
							</div>
							{/* New Statistics Section */}
							<div className="mt-8 flex space-x-16">
								<div className="flex flex-col items-start">
									<div className="lg:text-5xl md:text-4xl text-3xl text-white font-montserrat font-[420]">
										7+
									</div>
									<div className="text-white font-montserrat">
										Tahun Berdiri
									</div>
								</div>
								<div className="flex flex-col items-start">
									<div className="lg:text-5xl md:text-4xl text-3xl text-white font-montserrat font-[420]">
										500+
									</div>
									<div className="text-white font-montserrat">
										Mahasiswa di Shenzhen
									</div>
								</div>
							</div>
						</div>
						<div className="md:col-span-3 lg:col-span-2 md:h-full z-10">
							<Image
								src={AboutImage}
								alt="About Us Image"
								className="rounded-none"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Vision & Mission */}
			<section className="bg-[#7E0C0E] pt-12 pb-20 px-4 md:px-8">
				<div className="max-w-[90rem] mx-auto flex flex-col md:flex-row text-white">
					<div className="ml-4">
						<div className="flex flex-col md:flex-row">
							<div className="flex-1 pr-4 mb-8 md:mb-0">
								<h2 className="text-3xl lg:text-4xl font-bold font-montserrat mb-4 text-center mb-6">
									VISI
								</h2>
								<p className="text-xl lg:text-2xl font-montserrat font-small">
									Menjadikan PPIT Shenzhen wadah yang 
									hangat, inklusif, dan membangun, dimana setiap
									pelajar Indonesia dapat merasakan kebersamaan 
									dalam kehidupan perkuliahan, serta berkembang 
									secara pribadi dan kolektif. 
									
								</p>
								{/* <div className="flex items-center justify-center">
									<Image
										src={Vision}
										className="mt-6 md:mt-12 w-[25%] h-auto object-cover"
										width={200}
										height={200}
										alt="Vision"
									/>
								</div> */}
							</div>
							<div className="md:border-l-2 border-gray-300 mx-4" />
							<div className="flex-1 md:pl-4 mb-8 md:mb-0">
								<h2 className="text-3xl lg:text-4xl font-bold font-montserrat mb-4 text-center mb-6">
									MISI
								</h2>
									<ul className="list-disc list-inside text-left text-xl lg:text-2xl font-montserrat font-small mx-auto max-w-xl text-justify">
										<li>
										<span className="font-bold">Grow:</span> Mendorong Pengembangan diri mahasiswa melalui kegiatan edukatif, kreatif, dan kolaboratif yang membentuk pribadi tangguh dan berdaya saing.
										</li>
										<li>
										<span className="font-bold">Laugh:</span> Menciptakan lingkungan yang menyenangkan melalui berbagai program yang membangun suasan positif, sehat, dan penuh tawa.
										</li>
										<li>
										<span className="font-bold">Open:</span> Menumbuhkan budaya keterbukaan, komunikasi 2 arah, dan kolaborasi antaranggota demi terciptanya organisasi yang responsif dan adaptif.
										</li>
										<li>
										<span className="font-bold">Warm:</span> Memperkuat rasa kekeluargaan antar pelajar Indonesia di Shenzhen agar setiap individu merasa diterima, didengar, dan dihargai.
										</li>
									</ul>
				
								{/* <div className="flex items-center justify-center">
									<Image
										src={Mission}
										className="mt-6 md:mt-12 w-[25%] h-auto object-cover"
										width={200}
										height={200}
										alt="Mission"
									/>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Merchandise Section */}
			{/* <section className="grid grid-cols-1 lg:grid-cols-8">
				<div className="col-span-3 md:col-span-3">
					<div className="h-full lg:w-full sm:w-[65%] w-full mx-auto">
						<Image
							src={BestSeller}
							alt="Shenzhen EST. 2018 Exclusive Sweater"
							className="w-full h-full object-contain"
							width={400}
							height={400}
							quality={100}
						/>
					</div>
				</div>

				<div className="mt-12 md:mt-16 col-span-5 md:col-span-5">
					<div className="flex flex-col lg:flex-row gap-4 md:gap-6 xl:gap-8 xl:mx-24 md:mx-16 mx-12">
						<div className="flex flex-col">
							<h2 className="md:text-5xl text-4xl font-black text-center lg:text-left font-montserrat">
								Merchandise
							</h2>
							<p className="text-xl md:text-2xl text-center lg:text-left font-montserrat">
								get them while they're still in stock!
							</p>
						</div>
						<div className="flex items-center justify-center">
							<Link
								href="https://docs.google.com/forms/d/e/1FAIpQLSfJbSNKm60OtPAqF9Pk6TqfwXrS3LODmjnwPORwbZDtBu7nDQ/viewform?usp=pp_url"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white font-bold xl:text-3xl text-2xl xl:px-6 px-4 py-3 mx-4 bg-red-600 font-montserrat hover:scale-110 transition duration-300 text-center"
							>
								BUY NOW
							</Link>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 md:grid-cols-2 mt-12 mx-12">
						{merchandise.map((item, index) => (
							<div key={index} className="flex flex-col items-center">
								<Image
									src={item.image}
									alt={item.name}
									className="md:w-[70%] h-auto object-cover"
									width={200}
									height={200}
								/>
								<div className="flex flex-col items-center justify-center p-2">
									<h3 className="font-bold text-center text-lg font-montserrat">
										{item.name}
									</h3>
									<p className="font-bold text-lg text-red-600 font-montserrat">
										{item.price}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section> */}

			{/* <hr className="w-full border-t-2 border-gray-200 font-montserrat mt-10" /> */}
			{/* Universities Section */}
			<section className="bg-[#7E0C0E] py-16 px-4 md:px-8">
				<div className="max-w-7xl mx-auto">
					{/* Centered Heading */}
					<div className="flex justify-center">
						<h2 className="text-lg md:text-3xl sm:text-xl font-bold mb-12 text-red-800 bg-white inline-block py-3 md:py-4 px-6 rounded-lg font-montserrat">
							UNIVERSITIES IN SHENZHEN
						</h2>
					</div>

					{/* Centered List of Universities */}
					<div className="flex justify-center mx-6 mb-6">
						<div className="space-y-12 relative font-title">
							{universities.map((uni, index) => (
								<div key={index} className="flex items-center gap-6 relative">
									{/* Circle */}
									<div className="w-6 h-6 rounded-full border-[3px] border-white relative z-10"
									style={{backgroundColor	: uni.color}}
									></div>
									
									{/* Vertical Line (except for the last item) */}
									{index < universities.length - 1 && (
										<div className="absolute left-[0.6rem] top-6 h-[calc(100%+3rem)] w-1 bg-white z-0"></div>
									)}

									{/* University Details */}
									<div>
										<h3 className="md:text-xl sm:text-md text-sm text-white font-semibold font-montserrat">
										{uni.name}
									</h3>
										<p className="md:text-xl sm:text-md text-sm text-white font-montserrat">
											{uni.ranking}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
