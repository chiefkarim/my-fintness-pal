'use client';

import type { MobileNet } from '@tensorflow-models/mobilenet';

let modelPromise: Promise<MobileNet> | null = null;

export interface Prediction {
  label: string;
  probability: number;
}

export async function loadMobileNet(): Promise<MobileNet> {
  if (!modelPromise) {
    modelPromise = (async () => {
      const tf = await import('@tensorflow/tfjs');
      await tf.ready();
      const mobilenet = await import('@tensorflow-models/mobilenet');
      return mobilenet.load({ version: 2, alpha: 1.0 });
    })();
  }

  return modelPromise;
}

export async function classifyImage(
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  topK = 3
): Promise<Prediction[]> {
  const model = await loadMobileNet();
  const predictions = await model.classify(image, topK);

  return predictions.map((prediction) => ({
    label: prediction.className,
    probability: prediction.probability,
  }));
}
