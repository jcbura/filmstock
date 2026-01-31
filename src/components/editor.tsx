'use client';

import { Button } from '@/components';
import { applyFilmShader } from '@/utils';
import { CaretUpDownIcon, XIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const CanvasImage = ({ file }: { file: File }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageUrl = URL.createObjectURL(file);
    const img = new window.Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      applyFilmShader(canvas, img, 0.15, 0.65, 0.3, 0.4);

      URL.revokeObjectURL(imageUrl);
    };

    img.src = imageUrl;

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [file]);

  return (
    <canvas
      ref={canvasRef}
      className="max-h-[calc(100vh-10rem)] max-w-[calc(100vw-4rem)] object-contain select-none sm:max-w-full"
    />
  );
};

export const Editor = ({
  file,
  setFile,
}: {
  file: File;
  setFile: (file: File | null) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const imageUrl = useMemo(() => URL.createObjectURL(file), [file]);

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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFile(null);
      }
    },
    [setFile],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  ]);

  return (
    <div className="bg-background relative h-full w-full">
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-2 right-2 z-10 rounded-full sm:top-4 sm:right-4"
        onClick={() => setFile(null)}
      >
        <XIcon />
      </Button>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4 sm:p-8">
        {imageUrl && (
          <div
            ref={containerRef}
            className="relative cursor-ew-resize touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="original"
              className="max-h-[calc(100vh-10rem)] max-w-[calc(100vw-4rem)] object-contain select-none sm:max-w-full"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <CanvasImage file={file} />
            </div>
            <div
              style={{
                left: `calc(${sliderPosition}% - ${sliderPosition}px / 100)`,
              }}
              className="absolute inset-y-0 cursor-ew-resize select-none"
            >
              <div className="bg-primary h-full w-px" />
              <div className="bg-primary absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded px-2 py-0.5">
                <CaretUpDownIcon
                  weight="fill"
                  className="text-primary-foreground rotate-90"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
