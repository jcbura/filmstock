'use client';

import { Button, P } from '@/components';
import { ImageBrokenIcon } from '@phosphor-icons/react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4 transition-colors">
      <div className="flex h-full w-full flex-col items-center justify-center rounded border-2 border-dashed transition-colors">
        <div className="flex flex-col items-center gap-6 text-center">
          <ImageBrokenIcon weight="thin" className="-mb-6 size-40" />
          <div className="space-y-2">
            <P variant="lg">Something Went Wrong</P>
            <P variant="muted">
              sorry, we&apos;ve encountered an error while processing your
              request
            </P>
            {isDev && (
              <P className="text-destructive font-mono">{error.message}</P>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={reset}>Try Again</Button>
            <Button variant="secondary" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
