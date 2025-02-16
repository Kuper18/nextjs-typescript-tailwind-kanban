import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { newBoardSchema } from '@/schemas/board';

import { Button } from '../atoms/button';
import { Form, FormLabel } from '../atoms/form';
import CloseIcon from '../atoms/icons/CloseIcon';
import FormInput from '../molecules/FormInput';

type FormData = z.infer<typeof newBoardSchema>;

const BoardFrom = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(newBoardSchema),
    defaultValues: {
      name: '',
      columns: Array.from([1, 2], () => ({ title: '' })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'columns',
  });

  const handleSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormInput
          variant="common"
          form={form}
          label="Name"
          name="name"
          placeHolder="e.g. Web Design"
        />

        <div className="space-y-3">
          <FormLabel className="!-mb-1 block">Columns</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-[16px]">
              <FormInput
                variant="array"
                form={form}
                name={`columns.${index}.title`}
                placeHolder="e.g in progress"
              />

              <Button
                className="h-fit w-fit p-0"
                variant="ghost"
                onClick={() => remove(index)}
              >
                <CloseIcon />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            className="w-full rounded-full"
            onClick={() => append({ title: '' })}
          >
            <Plus className="h-3 w-3" />
            <span className="hidden sm:inline">Add New Column</span>
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Create New Board
        </Button>
      </form>
    </Form>
  );
};

export default BoardFrom;
