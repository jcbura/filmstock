import { Button, Kbd, P } from '@/components';
import { ImageIcon, XIcon } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home',
};

const Home = () => {
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
            <div className="relative cursor-ew-resize touch-none">
              <Image
                src="/test.jpeg"
                width={4096}
                height={2760}
                alt=""
                className="max-h-[calc(100vh-10rem)] max-w-[calc(100vw-4rem)] object-contain select-none"
              />
              <div className="absolute inset-0 overflow-hidden">
                {/* add clip path to above div */}
                <Image
                  src="/test.jpeg"
                  width={4096}
                  height={2760}
                  alt=""
                  className="max-h-[calc(100vh-10rem)] max-w-[calc(100vw-4rem)] object-contain grayscale select-none"
                />
              </div>
              <div className="absolute inset-y-0 cursor-ew-resize select-none">
                {/* add style for positioning horizontally */}
                <div className="bg-primary h-full w-px" />
                <div className="bg-primary absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded px-2 py-0.5">
                  <P variant="sm" className="text-primary-foreground">
                    50%
                  </P>
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
