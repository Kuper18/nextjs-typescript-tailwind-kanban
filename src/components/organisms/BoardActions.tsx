import { Plus } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { Button } from '../atoms/button';

import BoardDropDownMenu from './BoardDropDownMenu';
import CreateTaskDialog from './CreateTaskDialog';

const BoardActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = useCallback((val: boolean) => setIsOpen(val), []);

  return (
    <div className="flex items-center space-x-[16px] sm:space-x-6">
      <CreateTaskDialog open={isOpen} toggleModal={toggleModal}>
        <Button size="lg" className="w-12 sm:w-[164px]">
          <Plus className="h-3 w-3" />
          <span className="hidden sm:inline">Add New Task</span>
        </Button>
      </CreateTaskDialog>

      <BoardDropDownMenu />
    </div>
  );
};

export default BoardActions;
