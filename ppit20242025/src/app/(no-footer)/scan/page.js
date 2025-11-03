import BarcodeScanner from '../../Components/BarcodeScanner';

export default function ScanPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Scan Participant Code</h1>
      <BarcodeScanner />
    </div>
  );
} 