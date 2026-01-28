import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

const pVariants = cva('', {
  variants: {
    variant: {
      default: 'leading-7',
      lead: 'text-muted-foreground text-xl',
      lg: 'text-lg font-semibold',
      sm: 'text-sm leading-none font-medium',
      muted: 'text-muted-foreground text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function P({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'p'> &
  VariantProps<typeof pVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'p';

  return (
    <Comp
      data-slot="p"
      className={cn(pVariants({ variant, className }))}
      {...props}
    />
  );
}

export { P, pVariants };
