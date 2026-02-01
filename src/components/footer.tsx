import {
  Button,
  H1,
  Input,
  Label,
  NativeSelect,
  NativeSelectOption,
  ThemeToggle,
} from '@/components';
import { FILM_PRESETS } from '@/utils';
import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr';

const presets = Object.keys(FILM_PRESETS);

export const Footer = ({
  isFileSelected = false,
}: {
  isFileSelected?: boolean;
}) => {
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
            <NativeSelect id="preset" defaultValue="custom">
              <NativeSelectOption value="">custom</NativeSelectOption>
              {presets.map(preset => (
                <NativeSelectOption key={preset} value={preset}>
                  {preset}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="grain">grain</Label>
            <Input id="grain" type="number" step={0.01} min={0} max={1} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="warmth">warmth</Label>
            <Input id="warmth" type="number" step={0.01} min={0} max={1} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="contrast">contrast</Label>
            <Input id="contrast" type="number" step={0.01} min={0} max={1} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="saturation">saturation</Label>
            <Input id="saturation" type="number" step={0.01} min={0} max={1} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="vignette">vignette</Label>
            <Input id="vignette" type="number" step={0.01} min={0} max={1} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="fade">fade</Label>
            <Input id="fade" type="number" step={0.01} min={0} max={1} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="halation">halation</Label>
            <Input id="halation" type="number" step={0.01} min={0} max={1} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="bloom">bloom</Label>
            <Input id="bloom" type="number" step={0.01} min={0} max={1} />
          </div>
          <Button size="icon-sm">
            <span className="sr-only">Download</span>
            <DownloadSimpleIcon />
          </Button>
        </div>
      )}
    </footer>
  );
};
