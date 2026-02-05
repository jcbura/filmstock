'use client';

import { FILM_PRESETS, FilmParameters, FilmPresetName } from '@/utils';
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

interface EditorContextType {
  parameters: FilmParameters;
  updateParameter: (key: keyof FilmParameters, value: number) => void;
  setParameters: (parameters: Partial<FilmParameters>) => void;
  currentPreset: FilmPresetName;
  applyPreset: (preset: FilmPresetName) => void;
  resetParameters: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  file: File | null;
  setFile: (file: File | null) => void;
  downloadImage: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const DEFAULT_PRESET: FilmPresetName = 'custom';

export const EditorProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [currentPreset, setCurrentPreset] =
    useState<FilmPresetName>(DEFAULT_PRESET);
  const [parameters, setParameters] = useState<FilmParameters>(
    FILM_PRESETS[DEFAULT_PRESET],
  );

  const applyPreset = useCallback((preset: FilmPresetName) => {
    setCurrentPreset(preset);
    setParameters(FILM_PRESETS[preset]);
  }, []);

  const updateParameter = useCallback(
    (key: keyof FilmParameters, value: number) => {
      setParameters(prev => ({ ...prev, [key]: value }));
      if (currentPreset !== 'custom') {
        setCurrentPreset('custom');
      }
    },
    [currentPreset],
  );

  const setParametersPartial = useCallback(
    (partial: Partial<FilmParameters>) => {
      setParameters(prev => ({ ...prev, ...partial }));
    },
    [],
  );

  const resetParameters = useCallback(() => {
    applyPreset(DEFAULT_PRESET);
  }, [applyPreset]);

  const downloadImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !file) return;

    const originalName = file.name.replace(/\.[^/.]+$/, '');
    const extension = file.type.split('/')[1] || 'png';

    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `filmstock-${originalName}.${extension}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, file.type || 'image/png');
  }, [file]);

  return (
    <EditorContext.Provider
      value={{
        parameters,
        updateParameter,
        setParameters: setParametersPartial,
        currentPreset,
        applyPreset,
        resetParameters,
        canvasRef,
        file,
        setFile,
        downloadImage,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
