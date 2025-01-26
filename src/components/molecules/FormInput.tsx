import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../atoms/form';
import { Input } from '../atoms/input';
import { cn } from '@/lib/utils';
import { UseFormReturn, Path, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};

const FormInput = <T extends FieldValues>({ form, name, label }: Props<T>) => {
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
            <Input
              type='text'
              placeholder={label}
              {...field}
              className={cn(
                errors[name]
                  ? 'border-destructive focus:border-destructive'
                  : undefined,
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
