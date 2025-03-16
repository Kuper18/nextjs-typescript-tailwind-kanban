import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { columnSchema } from '@/schemas/column';
import ColumnsService from '@/services/columns';
import { handleErrorResponse, showNotification } from '@/utils';

import { Button } from '../atoms/button';
import { Form } from '../atoms/form';
import FormInput from '../molecules/FormInput';

type FormData = z.infer<typeof columnSchema>;
type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColumnFrom: React.FC<Props> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const { boardId } = useParams<{ boardId: string }>();
  const form = useForm<FormData>({
    defaultValues: { name: '' },
    resolver: zodResolver(columnSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ColumnsService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
      showNotification('success', 'Column was created');
      setIsOpen((prev) => !prev);
    },
    onError: handleErrorResponse,
  });

  const handleSubmit = ({ name }: FormData) => {
    mutate({ name, boardId: Number(boardId) });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormInput
          variant="common"
          form={form}
          label="Name"
          name="name"
          placeHolder="e.g. in progress"
        />

        <Button
          disabled={isPending}
          isLoading={isPending}
          type="submit"
          className="w-full"
        >
          Create New Column
        </Button>
      </form>
    </Form>
  );
};

export default ColumnFrom;
