import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import {
  UseFormReturn,
  Path,
  FieldValues,
  FieldErrors,
} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { cn } from '@/lib/utils';

import { Input } from '../atoms/input';
import { Textarea } from '../atoms/textarea';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  variant: 'common' | 'password' | 'select' | 'array' | 'textarea';
  name: Path<T>;
  options?: { value: number; label: string }[];
  label?: string;
  placeHolder?: string;
};

const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  variant,
  options,
  placeHolder,
}: Props<T>) => {
  const [isShownPassword, setIsShownPassword] = useState(false);

  const hasNumber = !!name.match(/[0-9]/g);
  const [arrayName, index, title] = name.split('.');
  const arrayField = `${arrayName}[${index}].${title}` as Path<T>;
  const {
    formState: { errors },
  } = form;

  const arrayErrors: FieldErrors<{ [K: string]: { [S: string]: string }[] }> = errors;

  const handleClick = () => setIsShownPassword((prev) => !prev);

  return (
    <FormField
      control={form.control}
      name={hasNumber ? arrayField : name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              {variant === 'common' && (
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
              )}

              {variant === 'textarea' && (
                <Textarea
                  {...field}
                  className={cn(
                    errors[name]
                      ? 'border-destructive focus:border-destructive'
                      : undefined,
                  )}
                  placeholder={placeHolder ?? label}
                />
              )}

              {variant === 'array' && (
                <>
                  <Input
                    type="text"
                    placeholder={placeHolder ?? label}
                    {...field}
                    className={cn(
                      arrayErrors?.[arrayName]?.[Number(index)]?.[title]
                        ? 'border-destructive focus:border-destructive'
                        : undefined,
                    )}
                  />
                  <FormMessage className="absolute right-4 top-[50%] translate-y-[-50%]" />
                </>
              )}

              {variant === 'select' && (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                      {options?.map(({ label, value }) => (
                        <SelectItem value={value.toString()} key={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}

              {variant === 'password' && (
                <>
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
                </>
              )}
            </div>
          </FormControl>
          {variant !== 'array' && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default FormInput;
