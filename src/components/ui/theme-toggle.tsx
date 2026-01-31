'use client';

import { Button } from '@/components';
import { SunHorizonIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className="rounded-full"
      onClick={toggleTheme}
    >
      <span className="sr-only">Toggle Theme</span>
      <SunHorizonIcon />
    </Button>
  );
};
