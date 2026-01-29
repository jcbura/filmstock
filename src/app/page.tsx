'use client';

import { Button, Kbd, P } from '@/components';
import { cn } from '@/utils';
import { CaretUpDownIcon, ImageIcon, XIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const CanvasImage = ({ grayscale = false }: { grayscale?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new window.Image();
    img.src = '/test.jpeg';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        grayscale && 'grayscale',
        'max-h-[calc(100vh-10rem)] max-w-[calc(100vw-4rem)] object-contain select-none sm:max-w-full',
      )}
    />
  );
};

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderDrag = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderDrag(e.clientX);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleSliderDrag(e.clientX);
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleSliderDrag(e.touches[0].clientX);
    }
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      if (e.touches.length > 0) {
        handleSliderDrag(e.touches[0].clientX);
      }
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <>
      {false ? (
        <div className="flex h-full w-full flex-col items-center justify-center p-4">
          <div className="flex h-full w-full flex-col items-center justify-center rounded border-2 border-dashed">
            <div className="flex flex-col items-center gap-6 text-center">
              <ImageIcon weight="thin" className="-mb-6 size-40" />
              <div className="space-y-2">
                <P variant="lg">Drop PNG or JPEG here</P>
                <P variant="muted">or paste from clipboard</P>
              </div>
              <Button>
                Select File{' '}
                <Kbd className="bg-muted/40 dark:bg-muted/20 text-primary-foreground">
                  ⌘O
                </Kbd>
              </Button>
              <P variant="muted">
                <Kbd>⌘V</Kbd> to paste
              </P>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-background relative h-full w-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 sm:top-4 sm:right-4"
          >
            <XIcon />
          </Button>
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4 sm:p-8">
            <div
              ref={containerRef}
              className="relative cursor-ew-resize touch-none"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <CanvasImage grayscale />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <CanvasImage />
              </div>
              <div
                style={{ left: `${sliderPosition}%` }}
                className="absolute inset-y-0 cursor-ew-resize select-none"
              >
                <div className="bg-primary h-full w-px" />
                <div className="bg-primary absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded px-2 py-0.5">
                  <CaretUpDownIcon className="text-primary-foreground rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
