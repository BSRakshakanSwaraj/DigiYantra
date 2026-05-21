import QrReader from "react-qr-scanner";

interface Props {
  onScan: (data: string) => void;
}

export default function QRScanner({ onScan }: Props) {
  const handleScan = (data: any) => {
    if (data) {
      onScan(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <QrReader
      delay={300}
      style={previewStyle}
      onError={handleError}
      onScan={handleScan}
    />
  );
}