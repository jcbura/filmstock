import { cn } from '@/utils';
import { Slot } from 'radix-ui';
import * as React from 'react';

function H2({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h2'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'h2';

  return (
    <Comp
      data-slot="h2"
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

export { H2 };
