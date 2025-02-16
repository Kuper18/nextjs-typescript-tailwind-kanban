import React from 'react';

import DotColor from '../atoms/dot-color';
import { ScrollArea } from '../atoms/scroll-area';

import ViewTaskDialog from './ViewTaskDialog';

const Column = () => {
  return (
    <section className="w-[280px] flex-shrink-0">
      <ScrollArea className="h-[calc(100vh-156px)]">
        <h3 className="mb-6 flex items-center gap-3 text-heading-s text-secondary-foreground">
          <DotColor />
          Todo
        </h3>
        <div className="space-y-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
            <ViewTaskDialog key={item} />
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default Column;
