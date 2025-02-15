'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { loginSchema } from '@/schemas/auth';
import authApi from '@/services/auth';

import FormInput from '../molecules/FormInput';

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await authApi.login(data);
    router.push('/');
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
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

            <FormInput
              variant="password"
              form={form}
              label="Password"
              name="password"
            />

            <Button type="submit" className="w-full rounded-sm">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="space-x-2 text-sm text-muted-foreground">
        <p>Do not have an account?</p>
        <Link className="underline" href="/signup">
          Signup
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Login;
