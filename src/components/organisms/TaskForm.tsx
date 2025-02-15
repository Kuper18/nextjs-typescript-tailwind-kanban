import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { newTaskSchema } from '@/schemas/task';
import { z } from 'zod';
import { Form, FormLabel } from '../atoms/form';
import FormInput from '../molecules/FormInput';
import { Button } from '../atoms/button';
import TextareaInput from '../molecules/TextareaInput';
import SelectInput from '../molecules/SelectInput';
import CloseIcon from '../atoms/icons/CloseIcon';
import SubtaskInput from '../molecules/SubtaskInput';

type FormData = z.infer<typeof newTaskSchema>;

const TaskForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: '',
      subtasks: Array.from([1, 2], () => ({ title: '' })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
  });

  const handleSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormInput
          form={form}
          label="Title"
          name="title"
          placeHolder="e.g. Take coffee break"
        />

        <TextareaInput
          placeHolder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          form={form}
          label="Description"
          name="description"
        />

        <div className="space-y-3">
          <FormLabel className="!-mb-1 block">Subtasks</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-[16px]">
              <SubtaskInput
                form={form}
                name={`subtasks.${index}.title`}
                placeHolder="e.g. Make coffee"
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
            <span className="hidden sm:inline">Add New Subtask</span>
          </Button>
        </div>

        <SelectInput
          form={form}
          label="Status"
          name="status"
          options={[{ id: 1, name: '211231' }]}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
