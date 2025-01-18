import React, { useState, useCallback, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {
  Upload,
  Download,
  Image as ImageIcon,
  Trash2,
  ChevronLeft, ChevronRight,
  Loader2, RefreshCw, ZoomIn, ZoomOut, RotateCcw, Settings
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast, { Toaster } from 'react-hot-toast';
import CookieConsent from './components/CookieConsent';

// Page Components
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import MetaTags from './components/MetaTags';

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
import demo1 from './demo-images/1.png';
import demo1Removed from './demo-images/remove 1.png';
import demo2 from './demo-images/2.png';
import demo2Removed from './demo-images/remove 2.png';
import demo3 from './demo-images/3.png';
import demo3Removed from './demo-images/remove 3.png';

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
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <MetaTags 
          title="AI-Powered Background Remover"
          description="Remove image backgrounds instantly with our AI-powered tool. Fast, accurate, and easy to use."
        />
        <Header />
        
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={
              <div className="container mx-auto px-4">
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
                <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                      icon: <ImageIcon className="w-6 h-6" />
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
                <section className="mb-12 bg-gray-50 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-center mb-6">See It In Action</h2>
                  <div className="flex items-center justify-center gap-8">
                    <button
                      onClick={prevDemo}
                      className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Previous example"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <div className="relative flex gap-4 items-center justify-center">
                      <div className="w-[300px] h-[300px] relative">
                        <img
                          src={DEMO_IMAGES[currentDemoIndex].original}
                          alt="Original"
                          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
                        />
                        <p className="absolute -bottom-8 text-center w-full text-gray-600">Original</p>
                      </div>
                      
                      <div className="w-[300px] h-[300px] relative">
                        <img
                          src={DEMO_IMAGES[currentDemoIndex].processed}
                          alt="Background Removed"
                          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
                        />
                        <p className="absolute -bottom-8 text-center w-full text-gray-600">Background Removed</p>
                      </div>
                    </div>

                    <button
                      onClick={nextDemo}
                      className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Next example"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="text-center mt-12">
                    <div className="mt-4 flex justify-center gap-2">
                      {DEMO_IMAGES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentDemoIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentDemoIndex ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          aria-label={`Go to example ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
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
                          <ImageIcon className="w-4 h-4" />
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
                <section id="faq" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
                  <div className="max-w-3xl mx-auto space-y-6">
                    {[
                      {
                        q: "What types of images can I upload?",
                        a: "You can upload PNG, JPG, and WebP images. Make sure your image is less than 10MB - if it's larger, try reducing its size first using your device's built-in tools."
                      },
                      {
                        q: "How quickly can I remove backgrounds?",
                        a: "It's super fast! Just drop your image and you'll have your background removed in seconds. The tool works automatically - no manual editing needed."
                      },
                      {
                        q: "How many images can I process?",
                        a: "You can remove backgrounds from up to 50 images every day with your free account. Your daily limit refreshes at midnight."
                      },
                      {
                        q: "Can I use my edited images for my business?",
                        a: "Absolutely! Once you've removed the background, the image is yours to use however you like - whether it's for your website, social media, online store, or any other personal or business purpose."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                        <p className="text-gray-600">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            } />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>

        <Footer />
        <CookieConsent />
        <Toaster position="bottom-right" />
      </div>
    </HelmetProvider>
  );
}

export default App;