'use client';

import React from 'react';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '../atoms/switch';

const ToggleThemeButton = () => {
  const { setTheme } = useTheme();

  return (
    <div className="mx-auto flex h-12 w-[235px] items-center justify-center space-x-6 rounded-md bg-primary lg:w-[251px]">
      <Sun className="h-4 w-4 text-secondary-foreground" />
      <Switch
        onCheckedChange={(isChecked) => setTheme(isChecked ? 'dark' : 'light')}
      />
      <MoonStar className="h-4 w-4 text-secondary-foreground" />
    </div>
  );
};

export default ToggleThemeButton;
