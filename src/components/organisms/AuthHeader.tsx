import React from 'react';
import Logo from '../atoms/icons/Logo';
import ToggleThemeButton from '../molecules/ToggleThemeButton';

const AuthHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between space-x-4 border-b-[1px] bg-background px-4 sm:h-[81px] lg:h-24">
      <div className="flex items-center space-x-4">
        <Logo />
        <h1 className="text-heading-xl">kanban</h1>
      </div>
      <ToggleThemeButton />
    </header>
  );
};

export default AuthHeader;
