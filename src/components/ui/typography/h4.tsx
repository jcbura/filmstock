import { cn } from '@/utils';
import { Slot } from 'radix-ui';
import * as React from 'react';

function H4({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h4'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'h4';

  return (
    <Comp
      data-slot="h4"
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

export { H4 };
