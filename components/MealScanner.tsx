'use client';

import { useEffect, useRef, useState } from 'react';
import { classifyImage, Prediction } from '@/lib/ml/mobilenet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FoodResults } from '@/components/FoodResults';
import { searchFoods } from '@/lib/api/search';
import { USDASearchResult } from '@/app/api/usda/route';
import { useRouter } from 'next/navigation';

export function MealScanner() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [results, setResults] = useState<USDASearchResult[]>([]);
  const [loadingModel, setLoadingModel] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileUrlRef = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      stopCamera();
      if (fileUrlRef.current) {
        URL.revokeObjectURL(fileUrlRef.current);
      }
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Failed to access camera', err);
      setError('Unable to access camera. Please allow camera permissions or upload a photo.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setImageSrc(dataUrl);
    setPredictions([]);
    setSelectedLabel(null);
    setResults([]);
    stopCamera();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (fileUrlRef.current) {
      URL.revokeObjectURL(fileUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    fileUrlRef.current = url;
    setImageSrc(url);
    setPredictions([]);
    setSelectedLabel(null);
    setResults([]);
  };

  const runPrediction = async () => {
    if (!imgRef.current) return;
    setPredicting(true);
    setError(null);
    try {
      setLoadingModel(true);
      const nextPredictions = await classifyImage(imgRef.current, 3);
      setPredictions(nextPredictions);
    } catch (err) {
      console.error('Prediction failed', err);
      setError('Failed to analyze the image. Try another photo.');
    } finally {
      setLoadingModel(false);
      setPredicting(false);
    }
  };

  const handleSelect = async (label: string) => {
    setSelectedLabel(label);
    setSearching(true);
    setError(null);
    try {
      const data = await searchFoods(label);
      setResults(data);
    } catch (err) {
      console.error('USDA search failed', err);
      setError('USDA search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleAdded = () => {
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Scan Meal</h1>
        <p className="text-sm text-muted-foreground">
          Use your camera or upload a photo to identify a food and log it.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Capture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={startCamera} disabled={cameraActive}>
              {cameraActive ? 'Camera Active' : 'Use Camera'}
            </Button>
            {cameraActive && (
              <Button onClick={capturePhoto}>Capture Photo</Button>
            )}
            {cameraActive && (
              <Button variant="ghost" onClick={stopCamera}>
                Stop Camera
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Upload Photo</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {cameraActive && (
            <div className="overflow-hidden rounded-lg border">
              <video ref={videoRef} className="h-64 w-full object-cover" />
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>

      {imageSrc && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Meal preview"
              className="max-h-80 w-full rounded-lg object-contain"
              onLoad={() => setPredictions([])}
            />
            <Button onClick={runPrediction} disabled={predicting}>
              {predicting || loadingModel ? 'Analyzing...' : 'Analyze Photo'}
            </Button>
          </CardContent>
        </Card>
      )}

      {predictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Predictions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {predictions.map((prediction) => (
              <div
                key={prediction.label}
                className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-sm font-semibold">{prediction.label}</div>
                  <div className="text-xs text-muted-foreground">
                    Confidence {Math.round(prediction.probability * 100)}%
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleSelect(prediction.label)}
                  disabled={searching && selectedLabel === prediction.label}
                >
                  {searching && selectedLabel === prediction.label
                    ? 'Searching...'
                    : 'Select'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {selectedLabel && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">USDA Matches</h2>
              <p className="text-sm text-muted-foreground">Results for “{selectedLabel}”.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleSelect(selectedLabel)}>
              Refresh
            </Button>
          </div>
          {searching ? (
            <div className="text-sm text-muted-foreground">Searching USDA...</div>
          ) : (
            <FoodResults results={results} onAdded={handleAdded} />
          )}
        </section>
      )}
    </div>
  );
}
