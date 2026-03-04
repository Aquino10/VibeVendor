/**
 * BarcodeScanner - Uses html5-qrcode to scan barcodes via camera
 * Renders a viewfinder that auto-detects barcodes and fires onScan
 */

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose?: () => void;
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string>("");
  const containerId = "barcode-reader";

  const startScanning = async () => {
    try {
      setError("");
      const scanner = new Html5Qrcode(containerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        () => {} // ignore scan failures
      );
      setIsActive(true);
    } catch (err) {
      setError("Camera access denied or not available. Please allow camera permissions.");
      console.error("Scanner error:", err);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
    }
    setIsActive(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="clay-sm p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">📷 Barcode Scanner</h3>
        <div className="flex gap-2">
          {!isActive ? (
            <Button size="sm" onClick={startScanning} className="clay-button gap-1.5 bg-primary text-primary-foreground">
              <Camera className="h-3.5 w-3.5" /> Start Camera
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={stopScanning} className="clay-button gap-1.5">
              <CameraOff className="h-3.5 w-3.5" /> Stop
            </Button>
          )}
          {onClose && (
            <Button size="sm" variant="ghost" onClick={onClose}>✕</Button>
          )}
        </div>
      </div>

      <div
        id={containerId}
        className="overflow-hidden rounded-xl"
        style={{ minHeight: isActive ? 200 : 0 }}
      />

      {error && (
        <p className="mt-2 text-xs text-destructive">{error}</p>
      )}

      {!isActive && !error && (
        <p className="text-xs text-muted-foreground">
          Click "Start Camera" to scan a barcode
        </p>
      )}
    </div>
  );
}
