'use client';

import { Plus } from 'lucide-react';
import React from 'react';

import useColumns from '@/hooks/columns/use-columns';
import useTaskForm from '@/hooks/tasks/use-tasks-form';
import { TAction } from '@/types';

import { Button } from '../atoms/button';
import { Form, FormLabel } from '../atoms/form';
import CloseIcon from '../atoms/icons/CloseIcon';
import FormInput from '../molecules/FormInput';

type Props = {
  action: TAction;
};

const TaskForm: React.FC<Props> = ({ action }) => {
  const { data: columns } = useColumns();
  const { fields, form, handleSubmit, append, remove, handleRemove } = useTaskForm(action);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormInput
          variant="common"
          form={form}
          label="Title"
          name="title"
          placeHolder="e.g. Take coffee break"
        />

        <FormInput
          variant="textarea"
          placeHolder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          form={form}
          label="Description"
          name="description"
        />

        <div className="space-y-3">
          <FormLabel className="!-mb-1 block">Subtasks</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-[16px]">
              <FormInput
                variant="array"
                form={form}
                name={`subtasks.${index}.subtaskTitle`}
                placeHolder="e.g. Make coffee"
              />

              <Button
                className="h-fit w-fit p-0"
                variant="ghost"
                onClick={() => handleRemove(index)}
              >
                <CloseIcon />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            className="w-full rounded-full"
            onClick={() => append({ subtaskTitle: '' })}
          >
            <Plus className="h-3 w-3" />
            <span className="hidden sm:inline">Add New Subtask</span>
          </Button>
        </div>

        <FormInput
          variant="select"
          form={form}
          label="Status"
          name="status"
          options={columns?.map(({ id, name }) => ({ label: name, value: id }))}
        />

        <Button type="submit" className="w-full">
          {action === 'create' ? 'Create Task' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
