import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  ImageIcon, Upload, Download, Loader2, RefreshCw, 
  ZoomIn, ZoomOut, RotateCcw, Settings, Image as ImageFormat,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
// Replace this with your API key from https://www.remove.bg/api
// Free accounts get 50 free previews per month
const API_KEY = import.meta.env.VITE_REMOVE_BG_API_KEY || 'YOUR_API_KEY_HERE';

type ImageFormat = 'png' | 'jpg' | 'webp';
type ImageQuality = 'high' | 'medium' | 'low';

interface ImageSettings {
  format: ImageFormat;
  quality: ImageQuality;
  preserveSize: boolean;
}

// Import demo images
import demo1 from './demo images/1.png';
import demo1Removed from './demo images/remove 1.png';
import demo2 from './demo images/2.png';
import demo2Removed from './demo images/remove 2.png';
import demo3 from './demo images/3.png';
import demo3Removed from './demo images/remove 3.png';

// Demo images with their processed counterparts
const DEMO_IMAGES = [
  {
    original: demo1,
    processed: demo1Removed,
    title: 'Example 1'
  },
  {
    original: demo2,
    processed: demo2Removed,
    title: 'Example 2'
  },
  {
    original: demo3,
    processed: demo3Removed,
    title: 'Example 3'
  }
];

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [settings, setSettings] = useState<ImageSettings>({
    format: 'png',
    quality: 'high',
    preserveSize: true
  });
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!SUPPORTED_FORMATS.includes(file.type)) {
      toast.error('Please upload a supported image format (PNG, JPG, or WebP)');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setOriginalFile(file); // Set the original file
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setProcessedImage(null);
      setZoom(1);
    };
    reader.readAsDataURL(file);
    toast.success('Image uploaded successfully!');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false
  });

  const processImage = async () => {
    if (!image || !originalFile) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('image_file', originalFile);
    formData.append('size', settings.preserveSize ? 'full' : 'auto');
    formData.append('format', settings.format);

    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors?.[0]?.code === 'insufficient_credits') {
          throw new Error(
            'Your Today\'s credits have run out. Please try again tomorrow.'
          );
        }
        throw new Error(errorData.errors?.[0]?.title || 'Failed to process image');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      toast.success('Background removed successfully!');
    } catch (error: any) {
      console.error('Error processing image:', error);
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p>{error.message || 'Failed to process image. Please try again.'}</p>
        </div>
      ), { duration: 6000 });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage || !originalFile) return;
    
    const fileName = originalFile.name.split('.')[0];
    const format = settings.format;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `${fileName}-no-bg.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Image downloaded as ${format.toUpperCase()}`);
  };

  const resetImage = () => {
    setImage(null);
    setProcessedImage(null);
    setOriginalFile(null);
    setZoom(1);
    toast.success('Image reset successfully');
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev + 0.1 : prev - 0.1;
      return Math.min(Math.max(newZoom, 0.5), 2);
    });
  };

  const nextDemo = () => {
    setCurrentDemoIndex((prev) => (prev + 1) % DEMO_IMAGES.length);
  };

  const prevDemo = () => {
    setCurrentDemoIndex((prev) => (prev - 1 + DEMO_IMAGES.length) % DEMO_IMAGES.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-purple-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">EraseEaseBG</h1>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Remove Image Background Instantly
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered tool removes backgrounds from images in seconds. 
            Perfect for e-commerce, profile pictures, and design work.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Fast Processing',
              description: 'Remove backgrounds in seconds with our advanced AI technology',
              icon: <Loader2 className="w-6 h-6" />
            },
            {
              title: 'High Quality',
              description: 'Get professional-quality results with precise edge detection',
              icon: <ImageIcon className="w-6 h-6" />
            },
            {
              title: 'Multiple Formats',
              description: 'Support for PNG, JPG, and WebP formats up to 10MB',
              icon: <ImageFormat className="w-6 h-6" />
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Demo Section */}
        <section className="mb-12" aria-label="Demo Images">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">See It In Action</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <img
                  src={DEMO_IMAGES[currentDemoIndex].original}
                  alt="Original demo"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  Original
                </div>
              </div>
              <div className="relative">
                <img
                  src={DEMO_IMAGES[currentDemoIndex].processed}
                  alt="Processed demo"
                  className="w-full h-64 object-cover rounded-lg bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAOdEVYdFRpdGxlAENoZWNrZXJz5KMAZQAAABd0RVh0QXV0aG9yAExhcG8gQ2FsYW1hbmRyZWnfkRoqAAAAKXRFWHREZXNjcmlwdGlvbgBCYXNlZCBvbiBKYWt1YiBTdGVpbmVyJ3Mgd29yaxUT4uoAAAAWdEVYdENyZWF0aW9uIFRpbWUAMjAwNC0wMS0yMLjuyXkAAAAldEVYdFNvdXJjZQBodHRwOi8vamltbWFjLm11c2ljaGFsbC5jeolj2NQAAAB0SURBVDiNpZExDoAwCEWfxcQDeHEX7sDWG7h5EG/kIYyGLiQdDIn/J4X/3gctUUpZAAZ4DkB1ZO5S6g7YG7Bm5q6qGyB6YzsB4GY2B8y8l1L2iEgbWDNzV9XjZPYKiF5m9wBo3t0JoP/+MQQs+c6EkK8wAGTGPxF5gHlgAAAAAElFTkSuQmCC')]"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  Background Removed
                </div>
              </div>
            </div>
            <button
              onClick={prevDemo}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextDemo}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <p className="text-center mt-4 text-gray-600">
            {DEMO_IMAGES[currentDemoIndex].title} Example - {currentDemoIndex + 1} of {DEMO_IMAGES.length}
          </p>
        </section>

        {/* Upload Section */}
        <section className="mb-12" aria-label="Image Upload">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Upload Your Image</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {isDragActive
                  ? 'Drop your image here...'
                  : 'Drag & drop an image here, or click to select'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports PNG, JPG, WebP (max 10MB)
              </p>
            </div>

            {image && (
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Original Image</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleZoom('out')}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleZoom('in')}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      onClick={resetImage}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Reset"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg" style={{ height: '300px' }}>
                  <img
                    src={image}
                    alt="Original"
                    className="w-full h-full object-contain transition-transform duration-200"
                    style={{ transform: `scale(${zoom})` }}
                  />
                </div>
                <div className="mt-4 space-y-4">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Settings className="w-5 h-5" />
                    Export Settings
                  </button>
                  {showSettings && (
                    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Export Format
                        </label>
                        <div className="flex gap-2">
                          {(['png', 'jpg', 'webp'] as const).map(format => (
                            <button
                              key={format}
                              onClick={() => setSettings(s => ({ ...s, format }))}
                              className={`px-3 py-1 rounded-md text-sm ${
                                settings.format === format
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {format.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quality
                        </label>
                        <div className="flex gap-2">
                          {(['high', 'medium', 'low'] as const).map(quality => (
                            <button
                              key={quality}
                              onClick={() => setSettings(s => ({ ...s, quality }))}
                              className={`px-3 py-1 rounded-md text-sm capitalize ${
                                settings.quality === quality
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {quality}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="preserveSize"
                          checked={settings.preserveSize}
                          onChange={e => setSettings(s => ({ ...s, preserveSize: e.target.checked }))}
                          className="rounded text-purple-600"
                        />
                        <label htmlFor="preserveSize" className="text-sm text-gray-700">
                          Preserve original image size
                        </label>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={processImage}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2
                      ${isProcessing
                        ? 'bg-purple-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700'}`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-5 h-5" />
                        Remove Background
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Processed Image</h3>
              {processedImage && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ImageFormat className="w-4 h-4" />
                  <span className="uppercase">{settings.format}</span>
                </div>
              )}
            </div>
            {processedImage ? (
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg" style={{ height: '300px' }}>
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="w-full h-full object-contain rounded-lg bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAOdEVYdFRpdGxlAENoZWNrZXJz5KMAZQAAABd0RVh0QXV0aG9yAExhcG8gQ2FsYW1hbmRyZWnfkRoqAAAAKXRFWHREZXNjcmlwdGlvbgBCYXNlZCBvbiBKYWt1YiBTdGVpbmVyJ3Mgd29yaxUT4uoAAAAWdEVYdENyZWF0aW9uIFRpbWUAMjAwNC0wMS0yMLjuyXkAAAAldEVYdFNvdXJjZQBodHRwOi8vamltbWFjLm11c2ljaGFsbC5jeolj2NQAAAB0SURBVDiNpZExDoAwCEWfxcQDeHEX7sDWG7h5EG/kIYyGLiQdDIn/J4X/3gctUUpZAAZ4DkB1ZO5S6g7YG7Bm5q6qGyB6YzsB4GY2B8y8l1L2iEgbWDNzV9XjZPYKiF5m9wBo3t0JoP/+MQQs+c6EkK8wAGTGPxF5gHlgAAAAAElFTkSuQmCC')]"
                    style={{ transform: `scale(${zoom})` }}
                  />
                </div>
                <button
                  onClick={downloadImage}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Image
                </button>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-400">Processed image will appear here</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What file formats are supported?",
                a: "We support PNG, JPG (JPEG), and WebP formats. Files must be under 10MB in size."
              },
              {
                q: "How does the background removal work?",
                a: "We use advanced AI technology to detect and remove backgrounds automatically. The process typically takes just a few seconds."
              },
              {
                q: "Is there a limit to how many images I can process?",
                a: "The number of images you can process depends on your API key credits. Free accounts get 50 previews per month."
              },
              {
                q: "Can I use the processed images commercially?",
                a: "Yes, all processed images are free for both personal and commercial use."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-sm text-gray-600">
                EraseEaseBG is a powerful background removal tool that helps you create professional-looking images in seconds.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
                </li>
                <li>
                  <a href="#demo" className="text-sm text-gray-600 hover:text-gray-900">Demo</a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p> 2024 EraseEaseBG. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;