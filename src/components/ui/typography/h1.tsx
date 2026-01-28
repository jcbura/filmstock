import { cn } from '@/utils';
import { Slot } from 'radix-ui';
import * as React from 'react';

function H1({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h1'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'h1';

  return (
    <Comp
      data-slot="h1"
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    />
  );
}

export { H1 };
