'use client';

import React, { useState } from 'react';
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
import { Eye, EyeOff } from 'lucide-react';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  type?: 'text' | 'password';
};

const PasswordInput = <T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) => {
  const [isShownPassword, setIsShownPassword] = useState(false);

  const {
    formState: { errors },
  } = form;

  const handleClick = () => setIsShownPassword((prev) => !prev);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={isShownPassword ? 'text' : 'password'}
                placeholder={label}
                {...field}
                className={cn(
                  errors[name]
                    ? 'border-destructive focus:border-destructive'
                    : undefined,
                )}
              />
              {!isShownPassword ? (
                <Eye
                  onClick={handleClick}
                  className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer text-input-foreground"
                />
              ) : (
                <EyeOff
                  onClick={handleClick}
                  className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer text-input-foreground"
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
