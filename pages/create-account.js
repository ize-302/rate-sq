import React from 'react'
import { TextInput, PasswordInput, Button } from '@mantine/core';
import Link from 'next/link';
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from 'axios'
import AuthLayout from '@/components/layouts/Auth.layout';

export default function CreateAccount() {
  const [loading, setloading] = React.useState(false);
  const router = useRouter()
  const form = useForm({
    initialValues: {
      email: "",
      display_name: "",
      password: ""
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      display_name: (value) => value ? null : "Provide a display name",
      password: (value) => value ? null : "Provide a password"
    },
  });

  const handleAccountCreation = async () => {
    setloading(true);
    axios.post('/api/v1/auth/signup', form.values).then(response => {
      setloading(false);
      notifications.show({
        title: response.data.success,
        message: "",
        color: "green",
        icon: <IconCheck />,
      });
      router.push('/login')
    }).catch(err => {
      setloading(false);
      console.log(err)
      notifications.show({
        title: err.response.data.error,
        message: "",
        color: "red",
        icon: <IconX />,
      });
    })
  }

  return <AuthLayout header={'Create account'}>
    <form className="space-y-6" onSubmit={form.onSubmit(() => handleAccountCreation())}>
      <div className='border-b border-gray-200 mb-5 pb-5'>
        <TextInput
          placeholder="Your email"
          label="Email address"
          withAsterisk
          type='email'
          disabled={loading}
          {...form.getInputProps("email")}
        />
      </div>

      <div>
        <TextInput
          placeholder="Display name"
          label="Display name"
          withAsterisk
          type='text'
          disabled={loading}
          {...form.getInputProps("display_name")}
        />
      </div>

      <div>
        <PasswordInput
          placeholder="Password"
          label="Password"
          withAsterisk
          disabled={loading}
          {...form.getInputProps("password")}
        />
      </div>

      <Button loading={loading}
        type='submit' className='bg-primary text-secondary hover:bg-secondary hover:text-primary border-0 rounded-full  w-full'>
        Create account
      </Button>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Already have an account? {" "}
      <Link href="/login" className="font-semibold leading-6">Login</Link>
    </p>
  </AuthLayout>
}