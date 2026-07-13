import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CanvasSequenceProps {
  framesUrlPattern: string; // e.g., "/images/sequence/room_{index}.jpg"
  totalFrames: number;
  startFrame?: number;
  className?: string;
}

export const CanvasSequence = ({ 
  framesUrlPattern, 
  totalFrames, 
  startFrame = 1,
  className = ""
}: CanvasSequenceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Load images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    
    // We only load every nth frame for better performance if totalFrames is huge, 
    // but for now let's assume we load all of them.
    for (let i = startFrame; i <= totalFrames; i++) {
      const img = new Image();
      // Replace {index} with padded number (e.g. 001, 002)
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = framesUrlPattern.replace('{index}', paddedIndex);
      
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      // Important to push to array before onload to maintain order
      loadedImages.push(img);
    }
  }, [framesUrlPattern, totalFrames, startFrame]);

  // Setup GSAP and Canvas
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Handle resizing
    const render = (index: number) => {
      const img = images[index];
      if (!img) return;
      
      // Calculate aspect ratio covering
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(0); // Render first frame on resize
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // GSAP ScrollTrigger
    const playhead = { frame: 0 };
    
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3000", // The scroll distance (3000px = smooth scrubbing)
      pin: true,
      scrub: 0.5, // 0.5 seconds lag for smoothness
      animation: gsap.to(playhead, {
        frame: images.length - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => render(playhead.frame)
      })
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      trigger.kill();
    };
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} className={`relative w-full h-screen bg-navy overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-navy text-gold font-display">
          <div className="text-display-md mb-4">{loadProgress}%</div>
          <div className="text-caption uppercase tracking-widest text-pearl/50">Loading Immersive Experience</div>
        </div>
      )}
      <canvas 
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
      />
      {/* Overlay gradient to ensure text readability if placed over canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy" />
    </div>
  );
};

export default CanvasSequence;
