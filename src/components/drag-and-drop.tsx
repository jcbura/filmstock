'use client';

import { Button, Kbd, P } from '@/components';
import { cn } from '@/utils';
import { ImageIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const ACCEPT_MIME = ['image/png', 'image/jpg', 'image/jpeg'];

export const DragAndDrop = ({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void;
}) => {
  const [dropActive, setDropActive] = useState(false);
  const dragDepthRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSupported = (file: File) => ACCEPT_MIME.includes(file.type);

  const triggerFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList).filter(isSupported);
      if (files.length > 0) {
        onFileSelected(files[0]);
      }
    },
    [onFileSelected],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingContext =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      if (isTypingContext) return;

      const clipboardData = e.clipboardData;
      if (!clipboardData) return;

      const files: File[] = [];

      for (const item of clipboardData.items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file && ACCEPT_MIME.includes(file.type)) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        e.preventDefault();
        handleFile(files);
      }
    },
    [handleFile],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingContext =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      if (isTypingContext) return;

      if (e.key.toLowerCase() === 'o' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        triggerFilePicker();
      }
    },
    [triggerFilePicker],
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepthRef.current = 0;
    setDropActive(false);
    if (!e.dataTransfer?.files?.length) return;
    handleFile(e.dataTransfer.files);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepthRef.current += 1;
    setDropActive(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepthRef.current -= 1;
    if (dragDepthRef.current === 0) {
      setDropActive(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      handleFile(fileList);
    }

    e.target.value = '';
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('paste', handlePaste);
    };
  }, [handleKeyDown, handlePaste]);

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center p-4 transition-colors"
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div
        className={cn(
          dropActive && 'border-blue-500',
          'flex h-full w-full flex-col items-center justify-center rounded border-2 border-dashed transition-colors',
        )}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <ImageIcon weight="thin" className="-mb-6 size-40" />
          <div className="space-y-2">
            <P variant="lg">Drop PNG or JPEG here</P>
            <P variant="muted">or paste from clipboard</P>
          </div>
          <Button onClick={triggerFilePicker}>
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
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};
