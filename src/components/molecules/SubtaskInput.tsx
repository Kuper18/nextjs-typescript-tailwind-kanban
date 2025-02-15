import React from 'react';
import { cn } from '@/lib/utils';
import { UseFormReturn, Path, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../atoms/form';
import { Input } from '../atoms/input';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeHolder?: string;
};

const SubtaskInput = <T extends FieldValues>({
  form,
  name,
  label,
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
          <div className="relative">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                type="text"
                placeholder={placeHolder ?? label}
                {...field}
                className={cn(
                  errors[name]
                    ? 'border-destructive focus:border-destructive'
                    : undefined,
                )}
              />
            </FormControl>
            <FormMessage className="absolute right-4 top-[50%] translate-y-[-50%]" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default SubtaskInput;
