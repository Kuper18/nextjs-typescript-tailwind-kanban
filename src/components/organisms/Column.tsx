import React from 'react';
import CardTask from '../molecules/CardTask';
import DotColor from '../atoms/dot-color';
import ViewTaskDialog from './ViewTaskDialog';

const Column = () => {
  return (
    <section className="flex-shrink-0">
      <h3 className="mb-6 flex items-center gap-3 text-heading-s text-secondary-foreground">
        <DotColor />
        Todo
      </h3>
      <div className="space-y-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
          <ViewTaskDialog key={item} />
        ))}
      </div>
    </section>
  );
};

export default Column;
