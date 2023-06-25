import React from 'react'
import { TextInput, PasswordInput, Button } from '@mantine/core';
import AuthLayout from '../components/layouts/Auth.layout';
import Link from 'next/link';
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from 'axios'
import { saveTokenInCookies } from '@/utils/cookies.utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants';

export default function Login() {
  const [loading, setloading] = React.useState(false);
  const router = useRouter()
  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value) => value ? null : "Provide a password"
    },
  });

  const handleLogin = async () => {
    setloading(true);
    axios.post('/api/v1/auth/login', form.values).then(response => {
      setloading(false);
      saveTokenInCookies(ACCESS_TOKEN, response.data.access_token)
      saveTokenInCookies(REFRESH_TOKEN, response.data.refresh_token)
      router.push('/')
    }).catch(err => {
      setloading(false);
      console.log(err)
      notifications.show({
        title: err.response.data.message,
        message: "",
        color: "red",
        icon: <IconX />,
      });
    })
  }

  return <AuthLayout header={'Log in'}>
    <form className="space-y-6" onSubmit={form.onSubmit(() => handleLogin())}>
      <div>
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
        <PasswordInput
          placeholder="Password"
          label="Password"
          withAsterisk
          disabled={loading}
          {...form.getInputProps("password")}
        />
      </div>

      <Button type='submit' loading={loading} className='bg-primary text-secondary hover:bg-secondary hover:text-primary border-0 rounded-full w-full'>
        Login
      </Button>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Dont have an account? {" "}
      <Link href="/create-account" className="font-semibold leading-6">Create an account</Link>
    </p>
  </AuthLayout>
}