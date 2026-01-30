'use client';

import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { SunHorizonIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" onClick={toggleTheme}>
          <SunHorizonIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Toggle Theme</TooltipContent>
    </Tooltip>
  );
};
