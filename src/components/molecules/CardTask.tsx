import React from 'react';

import { Card } from '../atoms/card';

const CardTask = () => {
  return (
    <Card className="max-w-[280px] border-none px-[16px] py-[23px] shadow-custom">
      <h3 className="mb-2 text-heading-m leading-5">
        Add account management endpoints
      </h3>
      <p className="text-body-m text-secondary-foreground">0 of 3 substasks</p>
    </Card>
  );
};

export default CardTask;
