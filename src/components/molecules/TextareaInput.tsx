import React from 'react';
import { Textarea } from '../atoms/textarea';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../atoms/form';
import { cn } from '@/lib/utils';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeHolder?: string;
};

const TextareaInput = <T extends FieldValues>({
  form,
  label,
  name,
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
            <Textarea
              {...field}
              className={cn(
                errors[name]
                  ? 'border-destructive focus:border-destructive'
                  : undefined,
              )}
              placeholder={placeHolder ?? label}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaInput;
