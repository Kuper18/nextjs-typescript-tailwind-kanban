'use client';

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
import { signupSchema } from '@/schemas/signup-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from '../molecules/FormInput';
import PasswordInput from '../molecules/PasswordInput';
import Link from 'next/link';

type FormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
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
            <FormInput form={form} label="Email" name="email" />

            <div className="flex space-x-3">
              <FormInput form={form} label="First name" name="firstName" />
              <FormInput form={form} label="Last name" name="lastName" />
            </div>

            <PasswordInput form={form} label="Password" name="password" />
            <PasswordInput
              form={form}
              label="Confirm Password"
              name="confirmedPassword"
            />

            <Button type="submit" className="w-full rounded-sm">
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
