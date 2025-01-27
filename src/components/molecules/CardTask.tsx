import React from 'react';
import { Card } from '../atoms/card';

const CardTask = () => {
  return (
    <Card className="shadow-custom max-w-[280px] border-none px-[16px] py-[23px]">
      <h3 className="text-heading-m mb-2 leading-5">
        Add account management endpoints
      </h3>
      <p className='text-body-m text-secondary-foreground'>0 of 3 substasks</p>
    </Card>
  );
};

export default CardTask;
