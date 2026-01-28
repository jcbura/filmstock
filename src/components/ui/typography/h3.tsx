import { cn } from '@/utils';
import { Slot } from 'radix-ui';
import * as React from 'react';

function H3({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h3'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'h3';

  return (
    <Comp
      data-slot="h3"
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

export { H3 };
