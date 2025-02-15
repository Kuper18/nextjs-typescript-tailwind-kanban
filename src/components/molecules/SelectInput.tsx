import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../atoms/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { cn } from '@/lib/utils';
import { UseFormReturn, Path, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: { id: number; name: string }[];
  placeHolder?: string;
};

const SelectInput = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeHolder,
}: Props<T>) => {
  const {
    formState: { errors },
  } = form;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={cn(
                  'text-body-l',
                  errors[name]
                    ? 'border-destructive focus:border-destructive'
                    : undefined,
                )}
              >
                <SelectValue placeholder={placeHolder ?? label} />
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
