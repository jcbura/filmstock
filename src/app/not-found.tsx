import { Button, Footer, P } from '@/components';
import { ImageBrokenIcon } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'page not found',
  description: 'The page you are looking for could not be found.',
};

const NotFound = () => {
  return (
    <div className="bg-background flex h-svh max-w-full flex-col overflow-hidden">
      <main className="flex-1 overflow-hidden">
        <div className="flex h-full w-full flex-col items-center justify-center p-4 transition-colors">
          <div className="flex h-full w-full flex-col items-center justify-center rounded border-2 border-dashed transition-colors">
            <div className="flex flex-col items-center gap-6 text-center">
              <ImageBrokenIcon weight="thin" className="-mb-6 size-40" />
              <div className="space-y-2">
                <P variant="lg">404 Page Not Found</P>
                <P variant="muted">
                  sorry, we couldn&apos;t find the page you&apos;re looking for
                </P>
              </div>
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
