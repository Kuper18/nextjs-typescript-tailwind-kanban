'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/atoms/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Form } from '@/components/atoms/form';
import { signupSchema } from '@/schemas/auth';
import authApi from '@/services/auth';
import { TSignupFormData } from '@/types';
import { handleErrorResponse } from '@/utils';

import FormInput from '../molecules/FormInput';

const Signup = () => {
  const router = useRouter();
  const form = useForm<TSignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => router.push('/'),
    onError: handleErrorResponse,
  });

  const onSubmit = (data: TSignupFormData) => {
    mutate(data);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create your account to get started.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput
              variant="common"
              form={form}
              label="Email"
              name="email"
            />

            <div className="flex space-x-3">
              <FormInput
                variant="common"
                form={form}
                label="First name"
                name="firstName"
              />
              <FormInput
                variant="common"
                form={form}
                label="Last name"
                name="lastName"
              />
            </div>

            <FormInput
              variant="password"
              form={form}
              label="Password"
              name="password"
            />
            <FormInput
              variant="password"
              form={form}
              label="Confirm Password"
              name="confirmedPassword"
            />

            <Button
              isLoading={isPending}
              type="submit"
              className="w-full rounded-sm"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="space-x-2 text-sm text-muted-foreground">
        <p>Already have an account?</p>
        <Link className="underline" href="/login">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Signup;
