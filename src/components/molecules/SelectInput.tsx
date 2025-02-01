import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';

type Props = {
  options: { id: number; name: string }[];
};

const SelectInput = ({ options }: Props) => {
  return (
    <Select>
      <SelectTrigger className="text-body-l">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {options.map(({ id, name }) => (
            <SelectItem value={id.toString()} key={id}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
