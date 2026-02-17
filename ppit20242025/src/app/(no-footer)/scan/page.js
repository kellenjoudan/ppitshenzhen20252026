import BarcodeScanner from '../../Components/BarcodeScanner';
import Link from "next/link";

export default function ScanPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-4 mt-2">
          <Link
            href="/form"
            className="p-4 px-5 bg-gray-800 rounded-full ml-7 hover:bg-gray-700 text-white"
          >
            ←
          </Link>
      </div>
      <h1 className="text-2xl font-bold text-center mb-8 font-montserrat">Scan Participant Code</h1>
      <BarcodeScanner />
    </div>
  );
} 