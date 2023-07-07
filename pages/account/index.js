import React from 'react'
import AccountLayout from '@/components/layouts/Account.layout'
import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { UserContext } from '@/context/userContext';

export default function AccountPage() {
  const { user, updateProfile, loading } = React.useContext(UserContext)

  const form = useForm({
    initialValues: {
      display_name: user?.display_name,
    },
    validate: {
      display_name: (value) => value ? null : 'Name is required',
    },
  });

  return (
    <AccountLayout show='My account'>
      <form className='max-w-md' onSubmit={form.onSubmit((values) => updateProfile(values))}>
        <TextInput
          placeholder="Display name"
          label="Display name"
          withAsterisk
          disabled
          {...form.getInputProps('display_name')}
        />
        <Button disabled loading={loading} type='submit' className='mt-4 border-0 bg-secondary hover:bg-secondary'>Update</Button>
      </form>
    </AccountLayout>
  )
}