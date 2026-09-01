'use client';

import {
  Button,
  H1,
  Label,
  LegalInput,
  NativeSelect,
  NativeSelectOption,
  ThemeToggle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components';
import { useEditor } from '@/contexts';
import { FILM_PRESETS, FilmParameters, FilmPresetName } from '@/utils';
import { ArrowClockwiseIcon, DownloadSimpleIcon } from '@phosphor-icons/react';

const PRESET_OPTIONS = Object.keys(FILM_PRESETS) as FilmPresetName[];

const PARAMETER_CONFIG: Array<{
  key: keyof FilmParameters;
  label: string;
  min: number;
  max: number;
  step: number;
}> = [
  { key: 'grainIntensity', label: 'grain', min: 0, max: 1, step: 0.01 },
  { key: 'warmth', label: 'warmth', min: 0, max: 1, step: 0.01 },
  { key: 'saturation', label: 'saturation', min: 0, max: 2, step: 0.01 },
  { key: 'exposure', label: 'exposure', min: 0, max: 3, step: 0.01 },
  { key: 'vignette', label: 'vignette', min: 0, max: 1, step: 0.01 },
  { key: 'fade', label: 'fade', min: 0, max: 1, step: 0.01 },
  { key: 'contrast', label: 'contrast', min: 0, max: 1, step: 0.01 },
  { key: 'halation', label: 'halation', min: 0, max: 1, step: 0.01 },
  { key: 'bloom', label: 'bloom', min: 0, max: 1, step: 0.01 },
];

export const Footer = ({
  isFileSelected = false,
}: {
  isFileSelected?: boolean;
}) => {
  const {
    parameters,
    updateParameter,
    currentPreset,
    applyPreset,
    resetParameters,
    downloadImage,
  } = useEditor();

  const isDefaultCustom =
    currentPreset === 'custom' &&
    (Object.keys(FILM_PRESETS.custom) as (keyof FilmParameters)[]).every(
      key => parameters[key] === FILM_PRESETS.custom[key],
    );

  const handlePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    applyPreset(event.target.value as FilmPresetName);
  };

  const handleParameterChange = (key: keyof FilmParameters, value: string) => {
    updateParameter(key, parseFloat(value));
  };

  return (
    <footer className="bg-accent dark:bg-input/30 flex min-h-16 flex-col gap-2 border-t p-2 sm:px-4">
      <div className="flex w-full items-center justify-between">
        <H1 className="mb-0.5">filmstock</H1>
        <ThemeToggle />
      </div>
      {isFileSelected && (
        <div className="flex flex-wrap items-center gap-2 border-t pt-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="preset">preset</Label>
            <NativeSelect
              id="preset"
              value={currentPreset}
              onChange={handlePresetChange}
            >
              {PRESET_OPTIONS.map(preset => (
                <NativeSelectOption key={preset} value={preset}>
                  {preset}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          {PARAMETER_CONFIG.map(({ key, label, min, max, step }) => (
            <div key={key} className="flex items-center gap-2">
              <Label htmlFor={key}>{label}</Label>
              <LegalInput
                key={key}
                paramKey={key}
                step={step}
                min={min}
                max={max}
                value={parameters[key]}
                setValue={handleParameterChange}
              />
            </div>
          ))}
          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                disabled={isDefaultCustom}
                onClick={resetParameters}
              >
                <span className="sr-only">Reset Options</span>
                <ArrowClockwiseIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Reset Options</TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <Button size="icon-sm" onClick={downloadImage}>
                <span className="sr-only">Download</span>
                <DownloadSimpleIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Download</TooltipContent>
          </Tooltip>
        </div>
      )}
    </footer>
  );
};
